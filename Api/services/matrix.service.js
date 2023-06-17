const error = require("../infrastructure/common/error.generator");
const Matrix = require("../infrastructure/entities/matrix.entity");
const User = require("../infrastructure/entities/user.entity");
const matrixViewService = require("./matrix-view.service");

const getAllAsync = async (filter) => {
    var matrices = await Matrix.find();
    
    if (filter.ownerUserId) {
        var ownerUser = await User.findById(filter.ownerUserId);
        if (!ownerUser) {
            throw error.notFound("User", { id: filter.ownerUserId });
        }

        matrices = matrices.filter(matrix => matrix.ownerUserId == filter.ownerUserId);
    }

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
        throw error.notFound("Matrix", { id: matrixId });
    }

    var matrixResult = {
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId,
        ownerUserId: matrix.ownerUserId
    };

    return matrixResult;
};

const createAsync = async (matrixInput) => {
    var matrixWithSamePublicId = await Matrix.findOne({ publicId: matrixInput.publicId });
    if (matrixWithSamePublicId) {
        throw error.alreadyExist("Matrix", { publicId: matrixInput.publicId });
    }

    if (matrixInput.ownerUserId) {
        var ownerUser = await User.findById(matrixInput.ownerUserId);
        if (!ownerUser) {
            throw error.notFound("User", { id: matrixInput.ownerUserId });
        }
    }

    var matrix = new Matrix({
        name: matrixInput.name,
        publicId: matrixInput.publicId,
        ownerUserId: matrixInput.ownerUserId
    });

    await matrix.save();

    var matrixViewCreateOptions = {
        matrixId: matrix._id,
        size: {
            x: 16,
            y: 16
        }
    };
    await matrixViewService.createAsync(matrixViewCreateOptions);

    return matrix._id;
};

const updateAsync = async (matrixId, matrixInput) => {
    var matrix = await Matrix.findById(matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: matrixId });
    }

    if (matrixInput.publicId != matrix.publicId) {
        var matrixWithSamePublicId = await Matrix.findOne({ publicId: matrixInput.publicId });
        if (matrixWithSamePublicId) {
            throw error.alreadyExist("Matrix", { publicId: matrixInput.publicId });
        }
        
        matrix.publicId = matrixInput.publicId;
    }

    if (matrixInput.ownerUserId) {
        var ownerUser = await User.findById(matrixInput.ownerUserId);
        if (!ownerUser) {
            throw error.notFound("User", { id: matrixInput.ownerUserId });
        }
    }
    
    matrix.name = matrixInput.name;
    matrix.ownerUserId = matrixInput.ownerUserId;

    await matrix.save();
};

const deleteByIdAsync = async (matrixId) => {
    var matrix = await Matrix.findById(matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: matrixId });
    }

    await matrixViewService.deleteIfExistAsync(matrixId);
    
    await Matrix.findByIdAndDelete(matrixId);
};

module.exports.getAllAsync = getAllAsync;
module.exports.getByIdAsync = getByIdAsync;
module.exports.createAsync = createAsync;
module.exports.updateAsync = updateAsync;
module.exports.deleteByIdAsync = deleteByIdAsync;