const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);