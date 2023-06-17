const express = require("express");
const matrixViewService = require("../services/matrix-view.service");

const router = express.Router();

router.get("/:matrixId/view", async (req, res, next) => {
    try {
        var matrixId = req.params.matrixId;

        var matrixView = await matrixViewService.getByMatrixIdAsync(matrixId);

        return res.status(200).json(matrixView);
    }
    catch (err) {
        return next(err);
    }
});

router.put("/:matrixId/view", async (req, res, next) => {
    try {
        var matrixId = req.params.matrixId;
        var view = req.body.view;

        await matrixViewService.setByMatrixIdAsync(matrixId, view);
        var matrixView = await matrixViewService.getByMatrixIdAsync(matrixId);

        return res.status(200).json(matrixView);
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;