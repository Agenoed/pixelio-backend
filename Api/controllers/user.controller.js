const express = require("express");
const User = require("../entities/user.entity");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
    var users = await User.find();
    var responseList = [];

    users.forEach(user => responseList.push({
        id: user._id,
        email: user.email
    }));

    res.status(200).json({
        list: responseList,
        totalCount: responseList.length
    });
});

// Get User by Id
router.get("/:id", async (req, res) => {
    var user = await User.findById(req.params.id);

    res.status(200).json({
        id: user._id,
        email: user.email
    });
});

// Update User
router.put("/:id", async (req, res) => {
    var user = await User.findById(req.params.id);
    
    user.email = req.body.email;
    await user.save();

    res.status(200).json({
        id: user._id,
        email: user.email
    });
});

// Delete User by Id
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).send();
});

module.exports = router;