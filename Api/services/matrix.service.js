const Matrix = require("../infrastructure/entities/matrix.entity");

const getAllAsync = async () => {
    var matrices = await Matrix.find();
    var responseList = [];
    
    matrices.forEach(matrix => responseList.push({
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId
    }));

    var listResult = {
        list: responseList,
        totalCount: responseList.length
    };

    return listResult;
};

const getByIdAsync = async (matrixId) => {
    var matrix = await Matrix.findById(matrixId);
    if (!matrix) {
        throw {
            statusCode: 404,
            message: `Matrix with { id: "${matrixId}" } does not exist.`
        };
    }

    var matrixResult = {
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId
    };

    return matrixResult;
};

const createAsync = async (matrixInput) => {
    var matrixWithSamePublicId = await Matrix.findOne({ publicId: matrixInput.publicId });
    if (matrixWithSamePublicId) {
        throw {
            statusCode: 400,
            message: `Matrix with { publicId: "${matrixInput.publicId}" } already exists.`
        };
    }

    var matrix = new Matrix({
        name: matrixInput.name,
        publicId: matrixInput.publicId
    });

    await matrix.save();

    return matrix._id;
};

const updateAsync = async (matrixId, matrixInput) => {
    var matrix = await Matrix.findById(matrixId);
    if (!matrix) {
        throw {
            statusCode: 404,
            message: `Matrix with { id: "${matrixId}" } does not exist.`
        };
    }

    if (matrixInput.publicId != matrix.publicId) {
        var matrixWithSamePublicId = await Matrix.findOne({ publicId: matrixInput.publicId });
        if (matrixWithSamePublicId) {
            throw {
                statusCode: 400,
                message: `Matrix with { publicId: "${matrixInput.publicId}" } already exists.`
            };
        }
        
        matrix.publicId = matrixInput.publicId;
    }
    
    matrix.name = matrixInput.name;
    await matrix.save();
};

const deleteByIdAsync = async (matrixId) => {
    var matrix = await Matrix.findById(matrixId);
    if (!matrix) {
        throw {
            statusCode: 404,
            message: `Matrix with { id: "${matrixId}" } does not exist.`
        };
    }

    await Matrix.findByIdAndDelete(matrixId);
};

module.exports.getAllAsync = getAllAsync;
module.exports.getByIdAsync = getByIdAsync;
module.exports.createAsync = createAsync;
module.exports.updateAsync = updateAsync;
module.exports.deleteByIdAsync = deleteByIdAsync;