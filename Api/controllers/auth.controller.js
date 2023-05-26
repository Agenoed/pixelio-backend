const express = require("express");
const bcrypt = require("bcryptjs");
const jwtManager = require("../infrastructure/common/jwt.manager");
const User = require("../infrastructure/entities/user.entity");

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
    try {
        var passwordHash = await bcrypt.hash(req.body.password, 10);
        var user = new User({
            email: req.body.email,
            passwordHash: passwordHash
        });
    
        await user.save();
    
        var accessToken = jwtManager.generate(user._id, user.email);
    
        return res.status(200).json({
            userId: user._id,
            accessToken: accessToken
        });
    }
    catch (err) {
        return next(err);
    }
});

// Login
router.post("/login", async (req, res, next) => {
    try {
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
    
        return res.status(200).json({
            userId: user._id,
            accessToken: accessToken
        });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;