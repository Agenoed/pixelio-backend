require("dotenv").config();

const express = require("express");
const mongo = require("./infrastructure/mongo-db-manager");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const matricesRoutes = require("./routes/matrices");

mongo.connect();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes)
app.use("/api/matrices", matricesRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});