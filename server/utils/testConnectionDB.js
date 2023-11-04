require("dotenv").config({ path: "../config.env" });
const mongoose = require("mongoose");
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASENAME = process.env.DB_DATABASE;



const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@atlascluster.3ngvfcu.mongodb.net/${DB_DATABASENAME}`; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
