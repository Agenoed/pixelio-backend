const express = require("express");
const userService = require("../services/user.service");

const router = express.Router();

// Get All Users
router.get("/", async (req, res, next) => {
    try {
        // TODO Add query parametes for sorting/filtering
        var listResult = await userService.getAllAsync();

        return res.status(200).json(listResult);
    }
    catch (err) {
        return next(err);
    }
});

// Get User by Id
router.get("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var userId = req.params.id;
        var userResult = await userService.getByIdAsync(userId);

        return res.status(200).json(userResult);
    }
    catch (err) {
        return next(err);
    }
});

// Update User
router.put("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var userId = req.params.id;
        var userInput = req.body;
        
        await userService.updateAsync(userId, userInput);
        var userResult = await userService.getByIdAsync(userId);

        return res.status(200).json(userResult);
    }
    catch (err) {
        return next(err);
    }
});

// Delete User by Id
router.delete("/:id", async (req, res, next) => {
    try {
        // TODO Validate data
        var userId = req.params.id;
        await userService.deleteByIdAsync(userId);

        return res.status(200).send();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;