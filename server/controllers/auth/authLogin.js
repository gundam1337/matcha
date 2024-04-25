const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../../utils/sendEmail");
require('dotenv').config({ path: './config.env' });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

//FIXME : prvent login if the user is not have a verified email accout
//NOTE: Validation inputs Middleware:
const validate = [
  body("name")
    // .isLength({ max: 15 })
    // .withMessage("Must be 15 characters or less")
    .notEmpty()
    .withMessage("Required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    // .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    // .withMessage("Must contain 8 characters and one number"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
//NOTE :Authentication Middleware

const findUserByName = async (name) => {
  try {
    const user = await User.findOne({ username: name });
    return user || null;
  } catch (error) {
    console.error("Error in findUserByName:", error);
    return null;
  }
};

const authentication = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await findUserByName(name);
    if (!user) {
      res.status(400).send("User not found");
      return;
    }
    //adding the email to req object for later use
    req.email = user.email;

    const isMatch = await bcrypt.compare(password, user.passwordHash); // Assuming the field is passwordHash
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    next(); // Proceed only if authentication is successful
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Server error");
  }
};

//NOTE  : Session Management Middleware

const handleSessionManagement = async (req, res, next) => {
  const { name } = req.body;

  try {
    const user = await findUserByName(name);
    req.isProfileSetup = user.profile.isProfileSetup;
    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    const accessToken = jwt.sign(
      { username: user.username, email: user.email },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    // Create Refresh Token
    const refreshToken = jwt.sign(
      { username: user.username, email: user.email },
      refreshTokenSecret
    );

    // Store Refresh Token with User in Database
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts, enhancing security against XSS attacks
      sameSite: "strict", // Strictly controls when cookies are sent; use 'lax' for less strict control
      path: "/", // Sets the cookie to be accessible for the entire site
      maxAge: 24 * 60 * 60 * 1000 * 30, // Sets the cookie to expire in 30 day (in milliseconds)
    });

    // Storing tokens in the request object to be used by subsequent middleware
    req.accessToken = accessToken;
    next();
  } catch (err) {
    console.error("Session Management Error:", err);
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

//NOTE : Two-Factor Authentication Middleware
const sendLoginNotifactionEmail = async (req, res) => {
  const email = req.email;

  sendEmail(email, "login")
    .then(() => {
      console.log("The email has been sent");
      //res.status(200).json({ message: "Please check your email box" });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).send("Something is wrong with our email services");
      }
    });
  const accessToken = req.accessToken;
  res.json({ accessToken, isProfileSetup: req.isProfileSetup });
};

const login = [
  validate,
  handleValidationErrors,
  authentication,
  handleSessionManagement,
  sendLoginNotifactionEmail,
];

const signout = (req, res, next) => {
  console.log("sign out logic");
  // Your sign-out logic here
  res.status(200).send("Sign out successful"); // Example response
};

module.exports = { login, signout };
