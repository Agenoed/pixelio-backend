const express = require("express");
const authService = require("../services/auth.service");

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
    try {
        // TODO Add UserCredentials (req.body) validation
        var authResult = await authService.registerAsync(req.body);

        return res.status(200).json(authResult);
    }
    catch (err) {
        return next(err);
    }
});

// Login
router.post("/login", async (req, res, next) => {
    try {
        // TODO Add UserCredentials (req.body) validation
        var authResult = await authService.loginAsync(req.body);

        return res.status(200).json(authResult);
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;