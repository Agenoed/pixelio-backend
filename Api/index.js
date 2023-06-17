require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongo = require("./infrastructure/common/mongo-db.manager");

const errorHandlerMiddleware = require("./middlewares/error-handler.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const matrixController = require("./controllers/matrix.controller");

mongo.connect();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authController);
app.use("/api/users", authMiddleware, userController)
app.use("/api/matrices", authMiddleware, matrixController);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});