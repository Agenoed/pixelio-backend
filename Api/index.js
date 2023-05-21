require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const matricesRoutes = require("./routes/matrices");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());
app.use('/api/matrices', matricesRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});