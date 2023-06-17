const notFound = (entityName, searchCondition) => {
    var serializedCondition = JSON.stringify(searchCondition);

    return {
        statusCode: 404,
        message: `${entityName} with ${serializedCondition} does not exist.`
    };
};

const badRequest = (message) => {
    return {
        statusCode: 400,
        message: message
    };
};

const alreadyExist = (entityName, equalityCondition) => {
    var serializedCondition = JSON.stringify(equalityCondition);
    
    var message = `${entityName} with ${serializedCondition} already exists.`;

    return badRequest(message);
};

const notAuthorized = (message) => {
    return {
        statusCode: 401,
        message: message
    };
};

const internalServer = (message) => {
    return {
        statusCode: 500,
        message: message
    };
};

module.exports.notFound = notFound;
module.exports.badRequest = badRequest;
module.exports.alreadyExist = alreadyExist;
module.exports.notAuthorized = notAuthorized;
module.exports.internalServer = internalServer;