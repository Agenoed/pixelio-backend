require("dotenv").config();

const express = require("express");
const mongo = require("./common/mongo-db.manager");

const authMiddleware = require("./middlewares/auth.middleware");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const matrixController = require("./controllers/matrix.controller");

mongo.connect();

const app = express();

app.use(express.json());

app.use("/api/auth", authController);

app.use(authMiddleware);
app.use("/api/users", userController)
app.use("/api/matrices", matrixController);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});