require('dotenv').config();

const express = require('express');
const mongo = require("./database/mongo-db-manager");
const matricesRoutes = require("./routes/matrices");

mongo.connect();

const app = express();

app.use(express.json());
app.use('/api/matrices', matricesRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});