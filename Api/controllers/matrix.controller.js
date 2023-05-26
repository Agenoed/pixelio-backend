const express = require("express");
const matrixService = require("../services/matrix.service");

const router = express.Router();

// Get Matrices List
router.get("/", async (req, res, next) => {
    try {
        // TODO Add query parametes for sorting/filtering
        var listResult = await matrixService.getAllAsync();

        return res.status(200).json(listResult);
    }
    catch (err) {
        return next(err);
    }
});

// Get Matrix by Id
router.get("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var matrixId = req.params.id;
        var matrix = await matrixService.getByIdAsync(matrixId);
        
        return res.status(200).json(matrix);
    }
    catch (err) {
        return next(err);
    }
});

// Сreate Matrix
router.post("/", async (req, res, next) => {
    try {
        // TODO Validate data
        var matrixInput = req.body;
        var matrixId = await matrixService.createAsync(matrixInput);
        var matrix = await matrixService.getByIdAsync(matrixId);
        
        return res.status(200).json(matrix);
    }
    catch (err) {
        return next(err);
    }
});

// Update Matrix
router.put("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var matrixId = req.params.id;
        var matrixInput = req.body;

        await matrixService.updateAsync(matrixId, matrixInput);
        var matrix = await matrixService.getByIdAsync(matrixId);
        
        return res.status(200).json(matrix);
    }
    catch (err) {
        return next(err);
    }
});

// Delete Matrix by Id
router.delete("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var matrixId = req.params.id;
        await matrixService.deleteByIdAsync(matrixId);

        return res.status(200).send();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;