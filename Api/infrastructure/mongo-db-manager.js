const mongoose = require('mongoose');

const connect = () => {
    const connectionString = process.env.DATABASE_URL;

    mongoose.connect(connectionString);

    mongoose.connection.on('error', (error) => {
        console.log(error);
    });
    
    mongoose.connection.once('connected', () => {
        console.log('Database Connected');
    });
};

module.exports.connect = connect;