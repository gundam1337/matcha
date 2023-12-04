require("dotenv").config({ path: "../config.env" }); //FIXME I am not using the .env variables
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");
const generateVerificationToken = require("../utils/generateVerificationToken");

//NOTE: Validation inputs Middleware 

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

//NOTE  : check if the user exists in the database using the provided email
//TODO : if the user is legit send a redirection 
const checkUserExists = async (req, res, next) => {
    const { email } = req.body;
    // Check database for user with this email
    // If user exists, attach user data to req object and call next()
    // If user does not exist, return an error response
};

//

//NOTE  : generate a unique, time-sensitive reset token
//NOTE  : and   save the generated token and its expiry time in the database associated with the user's email

const generateSaveResetToken = async (req, res, next) => {
  // Save the token and expiry time in the database
  // On success, call next()
  // On failure, return an error response
};

//NOTE  : send the unique token to the user email  

const sendResetEmail = async (req, res, next) => {
    // Use email service to send the reset link
    // On success, call next()
    // On failure, return an error response
};


//NOTE  : verify the token 


//NOTE : then rest the password 


const forgotPassword = [];
const reset = [];

module.exports = { forgotPassword,reset };
