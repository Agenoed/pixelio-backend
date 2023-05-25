var jwtManager = require("../common/jwt.manager");

const authMiddleware = (req, res, next) => {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            message: "Authorization Failed."
        });
    }

    if (authHeader.split(' ')[0] == "Bearer") {
        if (authHeader.split(' ').length != 2) {
            return res.status(403).json({
                message: "Authorization Failed: Invalidate Authentication Header."
            });
        }

        var token = authHeader.split(' ')[1];
        var tokenValidationResult = jwtManager.validate(token);

        if (tokenValidationResult.isSuccess) {
            req.userSession = {
                isAuthorized: true,
                data: {
                    userId: tokenValidationResult.data.userId,
                    userEmail: tokenValidationResult.data.userEmail
                }
            };
        }
        else
        {
            return res.status(403).json({
                message: `Authorization Failed: ${tokenValidationResult.error}.`
            });
        }

        return next();
    } else {
        return res.status(403).json({
            message: "Authorization Failed: Non-Bearer Authentication is not supported."
        });
    }
};

module.exports = authMiddleware;