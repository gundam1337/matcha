require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

//TODO : add a midllewar that check the access token and refrech token befor going to protectred route
const app = express();
const authRoutes = require("./routes/auth.routes");
const profileRoute = require("./routes/profile.routes");

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // Allow all origins or be specific if needed
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  var allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://someotherdomain.com",
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Allow credentials for cookies etc.
  res.header("Access-Control-Allow-Credentials", "true");

  // Set the allowed headers and include 'x-access-token'
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );

  // Set the allowed methods
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // If it's a preflight (OPTIONS) request, return 204 No Content.
  if ("OPTIONS" === req.method) {
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

// DONE: this is a protected route : you can access to it without the access token and refrech token
app.use("/", profileRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;
