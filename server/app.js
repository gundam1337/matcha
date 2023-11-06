require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet")

const app = express();
const authRoutes = require ('./routes/auth.routes');

app.use(helmet());
//app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "..", "build")));
app.use('/', authRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;