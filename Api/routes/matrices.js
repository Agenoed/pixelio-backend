const express = require("express");
const Matrix = require("../models/matrix");

const router = express.Router();
module.exports = router;

// Get Matrices List
router.get("/", async (req, res) => {
    var matrices = await Matrix.find();
    var responseList = [];
    
    matrices.forEach(matrix => {
        responseList.push({
            id: matrix._id,
            name: matrix.name,
            publicId: matrix.publicId
        });
    });

    res.status(200).json({
        list: responseList,
        totalCount: responseList.length
    });
});

// Get Matrix by Id
router.get("/:id", async (req, res) => {
    var matrix = await Matrix.findById(req.params.id);

    res.status(200).json({
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId
    });
});

// Сreate Matrix
router.post("/", async (req, res) => {
    var matrix = new Matrix({
        name: req.body.name,
        publicId: req.body.publicId
    });

    matrix.save();

    res.status(200).json({
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId
    });
});

// Update Matrix
router.put("/:id", async (req, res) => {
    var matrix = await Matrix.findById(req.params.id);
    
    matrix.name = req.body.name;
    matrix.publicId = req.body.publicId;
    matrix.save();

    res.status(200).json({
        id: matrix._id,
        name: matrix.name,
        publicId: matrix.publicId
    });
});

// Delete Matrix by Id
router.delete("/:id", async (req, res) => {
    await Matrix.findByIdAndDelete(req.params.id);

    res.status(200).send();
});
