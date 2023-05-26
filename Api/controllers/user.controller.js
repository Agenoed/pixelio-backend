const express = require("express");
const User = require("../infrastructure/entities/user.entity");

const router = express.Router();

// Get All Users
router.get("/", async (req, res, next) => {
    try {
        var users = await User.find();
        var responseList = [];
    
        users.forEach(user => responseList.push({
            id: user._id,
            email: user.email
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

// Get User by Id
router.get("/:id", async (req, res, next) => {
    try {
        var user = await User.findById(req.params.id);

        return res.status(200).json({
            id: user._id,
            email: user.email
        });
    }
    catch (err) {
        return next(err);
    }
});

// Update User
router.put("/:id", async (req, res, next) => {
    try {
        var user = await User.findById(req.params.id);
    
        user.email = req.body.email;
        await user.save();
    
        return res.status(200).json({
            id: user._id,
            email: user.email
        });
    }
    catch (err) {
        return next(err);
    }
});

// Delete User by Id
router.delete("/:id", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;