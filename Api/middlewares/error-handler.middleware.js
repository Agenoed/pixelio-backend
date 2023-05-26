const errorHandlerMiddleware = (err, req, res, next) => {
    var statusCode = err.statusCode;
    if (statusCode == undefined) {
        statusCode = 500;
    }

    if (statusCode == 500) {
        console.error(err.message);
    }

    return res.status(statusCode).json({
        message: err.message
    });
};

module.exports = errorHandlerMiddleware;