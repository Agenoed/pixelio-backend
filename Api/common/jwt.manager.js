const jwt = require("jsonwebtoken");

const jwtSettings = {
    secret: process.env.JWT_SECRET,
    expirationTimeSeconds: parseInt(process.env.JWT_EXPIRATION_SECONDS),
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
};

const generate = (userId, userEmail) => {
    var token = jwt.sign(
        {
            userId: userId,
            userEmail: userEmail
        },
        jwtSettings.secret,
        {
            expiresIn: jwtSettings.expirationTimeSeconds,
            audience: jwtSettings.audience,
            issuer: jwtSettings.issuer
        });
    
    return token;
};

const validate = (token) => {
    var result = {
        isSuccess: undefined,
        data: null,
        error: null
    };

    jwt.verify(token, jwtSettings.secret, (err, decoded) => {
        if (err) {
            result.isSuccess = false;
            result.error = err.message;
        } else {
            result.isSuccess = true;
            result.data = {
                userId: decoded.userId,
                userEmail: decoded.userEmail
            };
        }
    });

    return result;
};

module.exports.generate = generate;
module.exports.validate = validate;