require("dotenv").config({ path: "../config.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");

const accessTokenSecret = "yourAccessTokenSecret"; // Replace with your secret key for access token
const refreshTokenSecret = "yourRefreshTokenSecret";

//NOTE: Validation inputs Middleware:
const validate = [
  body("name")
    .isLength({ max: 15 })
    .withMessage("Must be 15 characters or less")
    .notEmpty()
    .withMessage("Required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    .withMessage("Must contain 8 characters and one number"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
//NOTE :Authentication Middleware

const authentication = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
  next();
};

//NOTE  : Session Management Middleware
//TODO  : Create Refresh- and Accesstoken AND Store Refreshtoken with user in database
//TODO  : Send token. Refreshtoken as a cookie and accesstoken as a regular response

const handleSessionManagement = async (req, res, next) => {
  const { name } = req.body;
  try {
    //FIXME  duplcated code 
    const user = await User.findOne({ name }); 

    const accessToken = jwt.sign(
      { username: user.username },
      accessTokenSecret,
      {
        expiresIn: "1m",
      }
    );

    // Create Refresh Token
    const refreshToken = jwt.sign(
      { username: user.username },
      refreshTokenSecret
    );

    // Store Refresh Token with User in Database
    user.refreshToken = refreshToken; // Assuming your user model has a field for refreshToken
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true }); // Secure flag for HTTPS
    res.json({ accessToken });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

//NOTE : Two-Factor Authentication Middleware

//NOTE : Rate Limiting Middleware

const login = [
  validate,
  handleValidationErrors,
  authentication,
  handleSessionManagement,
];

const signout = (req, res, next) => {
  console.log("sign out logic");
  // Your sign-out logic here
  res.status(200).send("Sign out successful"); // Example response
};

module.exports = { login, signout };

//NOTE : add this middlware at the top of evry route
// const isAuth = req => {
//   const authorization = req.headers['authorization'];
//   if (!authorization) throw new Error('You need to login.');
//   // Based on 'Bearer ksfljrewori384328289398432'
//   const token = authorization.split(' ')[1];
//   const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
//   return userId;
// };

// module.exports = {
//   isAuth,
// };