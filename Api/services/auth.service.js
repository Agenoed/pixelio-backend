const bcrypt = require("bcryptjs");
const jwtManager = require("../infrastructure/common/jwt.manager");
const User = require("../infrastructure/entities/user.entity");

const registerAsync = async (userCredentials) => {
    var userWithSameEmail = await User.findOne({ email: userCredentials.email });
    if (userWithSameEmail) {
        throw {
            statusCode: 400,
            message: `User with { email: "${userCredentials.email}" } already exists.`
        };
    }
    
    var passwordHash = await bcrypt.hash(userCredentials.password, 10);
    var user = new User({
        email: userCredentials.email,
        passwordHash: passwordHash
    });

    await user.save();

    var authResult = {
        userId: user._id,
        accessToken: jwtManager.generate(user._id, user.email)
    };

    return authResult;
};

const loginAsync = async (userCredentials) => {
    var user = await User.findOne({ email: userCredentials.email });
    if (!user) {
        throw {
            statusCode: 400,
            message: "Incorrect Email or Password"
        };
    }

    var isPasswordCorrect = await bcrypt.compare(userCredentials.password, user.passwordHash);
    if (!isPasswordCorrect) {
        throw {
            statusCode: 400,
            message: "Incorrect Email or Password"
        };
    }

    var authResult = {
        userId: user._id,
        accessToken: jwtManager.generate(user._id, user.email)
    };

    return authResult;
};

module.exports.registerAsync = registerAsync;
module.exports.loginAsync = loginAsync;