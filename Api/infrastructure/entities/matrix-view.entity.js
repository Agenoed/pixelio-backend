const mongoose = require("mongoose");

const matrixViewSchema = new mongoose.Schema({
    matrixId: {
        required: true,
        type: String
    },
    pixels: {
        required: true,
        type: Array
    }
});

/*
MatrixView: {
    matrixId: <string>,
    pixels: [{
        color: {
            rgb: {
                r: int,
                g: int,
                b: int
            }
        }
    }]
}
*/

module.exports = mongoose.model("MatrixView", matrixViewSchema);