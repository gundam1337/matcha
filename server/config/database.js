const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const config = {
    port: process.env.PORT || 3001,
    // Uncomment the next line if you're using JWT authentication
    // jwtSecret: process.env.JWT_SECRET || 'A very long secret key',
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASENAME: process.env.DB_DATABASE,
};

// After the config object is created, you can then create the uri using those values
config.uri = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@atlascluster.3ngvfcu.mongodb.net/${config.DB_DATABASENAME}`;

//console.log(config)
// Export the config object if you need to use it in other files
module.exports = config;
