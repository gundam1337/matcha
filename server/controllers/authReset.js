require("dotenv").config({ path: "../config.env" }); //FIXME I am not using the .env variables
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/ResetToken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");

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
  const { email } = req.body;
  console.log(email);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "the email is not valid" });
  }
  next();
};

//NOTE  : check if the user exists in the database using the provided email
const checkUserExists = async (req, res, next) => {
  //TODO : check if the email is verified if not we cant reset the password 
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


//NOTE  : generate a unique, time-sensitive reset token
//NOTE  : save the generated token and its expiry time in the database associated with the user's email

const generateSaveResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const token = jwt.sign({ email }, resetTokenSecret, { expiresIn: "1h" }); // Expires in 1 hour

    const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour

    await Token.create({ email, token, expiresAt: expirationTime });

    // Add the token to the request object to be used in subsequent middlewares
    req.token = token;
  } catch (error) {
    console.error("Error creating token:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the token" });
  }
  next();
};

//NOTE  : send the unique token to the user email
//NOTE : https://yourapp.com/reset-password?token=<JWT>

const sendResetEmail = async (req, res) => {
  const token = req.token;
  const { email } = req.body;


  const createVerificationLink = (tokenToSend) => {
    const baseUrl = "http://localhost:3001/reset-password";
    return `${baseUrl}?token=${encodeURIComponent(tokenToSend)}`;
  };

  const verificationLink = createVerificationLink(token);

  sendEmail(email, "reset", verificationLink)
    .then(() => {
      console.log("The email has been sent");
      res.status(200).json({ message: "Please check your email box" });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).send("Something is wrong with our email services");
      }
    });
};

//GOAL : this is for the get request 

//NOTE  : verify the token
const authResetVerification = async (req, res) => {
  try {
    // Extract token from the query parameter or header
    const token = req.query.token;
    console.log("token is :",token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //const decoded = jwt.verify(token, resetTokenSecret);

    // Check if the token exists in the database
    const tokenDoc = await Token.findOne({token:token });
    if (!tokenDoc || tokenDoc.expiresAt < Date.now()) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const tempToken = jwt.sign(
      {
        token,
        isVerified: true,
      },
      resetTokenSecret,
      { expiresIn: "10m" } // Set a new expiration time
    );

    res.cookie("tempAuthToken", tempToken, { httpOnly: true, maxAge: 600000 }); // 10 minutes
    res.redirect("http://localhost:3000/?openReset=true#Reset");
    //res.status(200).json({ message: "Please check cockies" });
  } catch (error) {
    console.error("Error verifying email token:", error);
    res.status(500).send("Internal server error.");
  }
};

//NOTE : then rest the password

const validateResetPassword = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    .withMessage("Must contain 8 characters and one number"),
  body("passwordConfirmation")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    .withMessage("Must contain 8 characters and one number"),
];

const handlevalidateResetPasswordErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const resetPassword = async (req, res, next) => {
  try {
    const restToken = req.cookies.tempAuthToken;
    if (!restToken) return res.status(401).send("No token found in cookies");

    const decodedTempToken = jwt.verify(restToken, resetTokenSecret);
    const innerTokenIsVerified = decodedTempToken.isVerified;

    if (!innerTokenIsVerified)
        res.status(401).send("the email is not verified")

    const innerToken = decodedTempToken.token;
    if (!innerToken) {
      return res.status(401).send("Invalid token structure");
    }

    // Decode the inner token to extract the email
    const decodedInnerToken = jwt.verify(innerToken, resetTokenSecret);
    const email = decodedInnerToken.email;

    if (!email) {
      return res.status(400).send("Email not found in token");
    }
    //search for the user using the email
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send("User not found");
    }

    const newPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = passwordHash;
    await user.save();
    res.send("Password reset successfully");
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
};

const forgotPassword = [
  validate,
  handleValidationErrors,
  checkUserExists,
  generateSaveResetToken,
  sendResetEmail,
];
const reset = [
  validateResetPassword,
  handlevalidateResetPasswordErrors,
  resetPassword,
];

module.exports = { forgotPassword, reset, authResetVerification };
