const express = require("express");
const bcrypt = require("bcryptjs");
const jwtManager = require("../common/jwt.manager");
const User = require("../entities/user.entity");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    var passwordHash = await bcrypt.hash(req.body.password, 10);
    var user = new User({
        email: req.body.email,
        passwordHash: passwordHash
    });

    await user.save();

    var accessToken = jwtManager.generate(user._id, user.email);

    res.status(200).json({
        userId: user._id,
        accessToken: accessToken
    });
});

// Login
router.post("/login", async (req, res) => {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            message: "Incorrect Email or Password"
        });
    }

    var isPasswordCorrect = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Incorrect Email or Password"
        });
    }

    var accessToken = jwtManager.generate(user._id, user.email);

    res.status(200).json({
        userId: user._id,
        accessToken: accessToken
    });
});

module.exports = router;