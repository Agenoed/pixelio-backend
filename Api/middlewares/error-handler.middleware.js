const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    var statusCode = err.statusCode;
    if (statusCode == undefined)
        statusCode = 500;

    return res.status(statusCode).json({
        message: err.message
    });
};

module.exports = errorHandlerMiddleware;