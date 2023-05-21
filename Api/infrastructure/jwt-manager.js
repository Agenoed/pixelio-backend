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
            id: userId,
            email: userEmail
        },
        jwtSettings.secret,
        {
            expiresIn: jwtSettings.expirationTimeSeconds,
            audience: jwtSettings.audience,
            issuer: jwtSettings.issuer
        });
    
    return token;
};

module.exports.generate = generate;