const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

const connect = () => {
    mongoose.connect(connectionString);

    mongoose.connection.on('error', (error) => {
        console.log(error);
    });
    
    mongoose.connection.once('connected', () => {
        console.log('Database Connected');
    });
};

module.exports.connect = connect;