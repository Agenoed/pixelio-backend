const express = require("express");
const Matrix = require("../infrastructure/entities/matrix.entity");

const router = express.Router();

// Get Matrices List
router.get("/", async (req, res, next) => {
    try {
        var matrices = await Matrix.find();
        var responseList = [];
        
        matrices.forEach(matrix => responseList.push({
            id: matrix._id,
            name: matrix.name,
            publicId: matrix.publicId
        }));

        return res.status(200).json({
            list: responseList,
            totalCount: responseList.length
        });
    }
    catch (err) {
        return next(err);
    }
});

// Get Matrix by Id
router.get("/:id", async (req, res, next) => {
    try {
        var matrix = await Matrix.findById(req.params.id);

        return res.status(200).json({
            id: matrix._id,
            name: matrix.name,
            publicId: matrix.publicId
        });
    }
    catch (err) {
        return next(err);
    }
});

// Сreate Matrix
router.post("/", async (req, res, next) => {
    try {
        var matrix = new Matrix({
            name: req.body.name,
            publicId: req.body.publicId
        });
    
        await matrix.save();
    
        return res.status(200).json({
            id: matrix._id,
            name: matrix.name,
            publicId: matrix.publicId
        });
    }
    catch (err) {
        return next(err);
    }
});

// Update Matrix
router.put("/:id", async (req, res, next) => {
    try {
        var matrix = await Matrix.findById(req.params.id);
    
        matrix.name = req.body.name;
        matrix.publicId = req.body.publicId;
        await matrix.save();
    
        return res.status(200).json({
            id: matrix._id,
            name: matrix.name,
            publicId: matrix.publicId
        });
    }
    catch (err) {
        return next(err);
    }
});

// Delete Matrix by Id
router.delete("/:id", async (req, res, next) => {
    try {
        await Matrix.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;