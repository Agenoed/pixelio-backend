const mongoose = require("mongoose");

const matrixSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    publicId: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Matrix", matrixSchema);