const bcrypt = require("bcryptjs");
const jwtManager = require("../infrastructure/common/jwt.manager");
const error = require("../infrastructure/common/error.generator");
const User = require("../infrastructure/entities/user.entity");

const registerAsync = async (userCredentials) => {
    var userWithSameEmail = await User.findOne({ email: userCredentials.email });
    if (userWithSameEmail) {
        throw error.alreadyExist("User", { email: userCredentials.email });
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
        throw error.badRequest("Incorrect Email");
    }

    var isPasswordCorrect = await bcrypt.compare(userCredentials.password, user.passwordHash);
    if (!isPasswordCorrect) {
        throw error.badRequest("Incorrect Password");
    }

    var authResult = {
        userId: user._id,
        accessToken: jwtManager.generate(user._id, user.email)
    };

    return authResult;
};

module.exports.registerAsync = registerAsync;
module.exports.loginAsync = loginAsync;