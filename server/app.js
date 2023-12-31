require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');


const app = express();
const authRoutes = require("./routes/auth.routes");
const profileRoute = require("./routes/profile.routes")

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  // Set to allow the specific origin
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  
  // Allow credentials for cookies etc.
  res.header("Access-Control-Allow-Credentials", "true");
  
  // Set the allowed headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Set the allowed methods
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // If it's a preflight (OPTIONS) request, return 204 No Content.
  if ('OPTIONS' === req.method) {
    res.sendStatus(204);
  } else {
    next();
  }
});

// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   next();
// });

app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/", authRoutes);

app.use("/",profileRoute)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;
