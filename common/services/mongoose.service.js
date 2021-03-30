const mongoose = require('mongoose');
const config = require('../config/env.config.js');
let count = 0;

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose.connect(config.database.uri, config.database.options)
    .then(() => {
        console.log('MongoDB connected');    
    })
    .catch(err => {
        console.log('MongoDB failed to connect, retry after 5 seconds.', ++count);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;