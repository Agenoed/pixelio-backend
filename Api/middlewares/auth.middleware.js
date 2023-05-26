var jwtManager = require("../infrastructure/common/jwt.manager");
var error = require("../infrastructure/common/error.generator");

const authMiddleware = (req, res, next) => {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
        throw error.notAuthorized("Authorization Failed.");
    }

    if (authHeader.split(' ')[0] == "Bearer") {
        if (authHeader.split(' ').length != 2) {
            throw error.notAuthorized("Authorization Failed: Invalidate Authentication Header.");
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
        else {
            throw error.notAuthorized(`Authorization Failed: ${tokenValidationResult.error}.`);
        }

        return next();
    }
    else {
        throw error.notAuthorized("Authorization Failed: Non-Bearer Authentication is not supported.");
    }
};

module.exports = authMiddleware;