const error = require("../infrastructure/common/error.generator");
const MatrixView = require("../infrastructure/entities/matrix-view.entity");
const Matrix = require("../infrastructure/entities/matrix.entity");

const createAsync = async (createOptions) => {
    // TODO Add validation
    var matrix = Matrix.findById(createOptions.matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: createOptions.matrixId });
    }

    var matrixViewPixels = [];
    for (var x = 0; x < createOptions.size.x; x++) {
        var matrixViewPixelsColumn = [];
        for (var y = 0; y < createOptions.size.y; y++) {
            var pixel = {
                color: {
                    rgb: {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                }
            };
            matrixViewPixelsColumn.push(pixel);
        }
        matrixViewPixels.push(matrixViewPixelsColumn);
    }

    var matrixView = new MatrixView({
        matrixId: createOptions.matrixId,
        pixels: matrixViewPixels
    });

    matrixView.save();
};

const getByMatrixIdAsync = async (matrixId) => {
    var matrix = Matrix.findById(matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: matrixId });
    }

    var matrixView = await MatrixView.findOne({ matrixId: matrixId });
    if (!matrixView) {
        throw error.notFound("MatrixView", { matrixId: matrixId });
    }

    var matrixViewPixels = [];
    for (var x = 0; x < matrixView.pixels.length; x++) {
        var matrixViewPixelsColumn = [];
        for (var y = 0; y < matrixView.pixels[x].length; y++) {
            var pixel = matrixView.pixels[x][y];
            var rgb = {
                r: pixel.color.rgb.r,
                g: pixel.color.rgb.g,
                b: pixel.color.rgb.b
            };

            matrixViewPixelsColumn.push({
                rgb: rgb
            });
        }

        matrixViewPixels.push(matrixViewPixelsColumn);
    }

    var matrixViewResult = {
        matrixId: matrixId,
        view: matrixViewPixels
    };

    return matrixViewResult;
};

const setByMatrixIdAsync = async (matrixId, view) => {
    var matrix = Matrix.findById(matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: matrixId });
    }

    var matrixView = await MatrixView.findOne({ matrixId: matrixId });
    if (!matrixView) {
        throw error.notFound("MatrixView", { matrixId: matrixId });
    }

    if (matrixView.pixels.length != view.length
        || matrixView.pixels[0].length != view[0].length) {
        throw error.badRequest("Unable to udpate MatrixView Width of Height.");
    }

    for (var x = 0; x < matrixView.pixels.length; x++) {
        for (var y = 0; y < matrixView.pixels[x].length; y++) {
            if (!view[x][y].rgb) {
                throw error.badRequest("Not RGB color type is not supported to set in MartixView.");
            }

            matrixView.pixels[x][y].color.rgb.r = view[x][y].rgb.r;
            matrixView.pixels[x][y].color.rgb.g = view[x][y].rgb.g;
            matrixView.pixels[x][y].color.rgb.b = view[x][y].rgb.b;
        }
    }

    matrixView.markModified("pixels");
    await matrixView.save();
};

const deleteByMatrixIdIfExistAsync = async (matrixId) => {
    var matrix = Matrix.findById(matrixId);
    if (!matrix) {
        throw error.notFound("Matrix", { id: matrixId });
    }

    var matrixView = await MatrixView.findOne({ matrixId: matrixId });
    if (!matrixView) {
        return;
    }

    await MatrixView.findByIdAndDelete(matrixView._id);
};

module.exports.createAsync = createAsync;
module.exports.getByMatrixIdAsync = getByMatrixIdAsync;
module.exports.setByMatrixIdAsync = setByMatrixIdAsync;
module.exports.deleteByMatrixIdIfExistAsync = deleteByMatrixIdIfExistAsync;