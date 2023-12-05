require("dotenv").config({ path: "../config.env" }); //FIXME I am not using the .env variables
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/ResetToken")
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");
const generateVerificationToken = require("../utils/generateVerificationToken");

//NOTE: Validation inputs Middleware
const resetTokenSecret = "myresetTokenSecret";

const validate = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//NOTE  : check if the user exists in the database using the provided email
//TODO : if the user is legit send a redirection
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "there no user with this email" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the user" });
  }
  next();
};

//

//NOTE  : generate a unique, time-sensitive reset token
//NOTE  : and   save the generated token and its expiry time in the database associated with the user's email

const generateSaveResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const token = jwt.sign({ email }, resetTokenSecret, { expiresIn: '1h' }); // Expires in 1 hour

    const expirationTime = new Date(new Date().getTime() + (60 * 60 * 1000)); // Current time + 1 hour

    await Token.create({ email, token, expiresAt: expirationTime });

    // Add the token to the request object to be used in subsequent middlewares
    req.token = token;
  } catch (error) {
    console.error("Error creating token:", error);
    return res.status(500).json({ error: "An error occurred while creating the token" });
  }
  next();
};

//NOTE  : send the unique token to the user email
//NOTE : https://yourapp.com/reset-password?token=<JWT>

const sendResetEmail = async (req, res, next) => {
  // Use email service to send the reset link
  // On success, call next()
  // On failure, return an error response
 
};

//NOTE  : verify the token

//NOTE : then rest the password

const forgotPassword = [validate,handleValidationErrors,checkUserExists ,generateSaveResetToken];
const reset = [];

module.exports = { forgotPassword, reset };
