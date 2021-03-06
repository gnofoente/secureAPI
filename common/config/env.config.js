module.exports = {
    port: 8080,
    appEndpoint: 'http://localhost:8080',
    apiEndpoint: 'http://localhost:8080',
    environment: 'dev',
    database: {
        uri: 'mongodb://localhost/secureAPI',
        options: {
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
    
};

