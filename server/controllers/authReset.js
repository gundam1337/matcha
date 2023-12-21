require("dotenv").config({ path: "../config.env" }); //FIXME I am not using the .env variables
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/ResetToken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");



const accessToken = "yourAccessTokenSecret"; // Replace with your secret key for access token
const refreshToken = "yourRefreshTokenSecret";

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
    return res.status(400).json({ errors: "the email is not valid" }); //DONE : has been manged 
  }
  next();
};

//NOTE  : check if the user exists in the database using the provided email
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "there no user with this email" });//DONE 
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the user" }); //DONE
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
      res.status(200).json({ message: "Please check your email box" }); //DONE
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).send("Something is wrong with our email services");//DONE
      }
    });
};

//GOAL : this is for the GET request

//NOTE  : verify the token
const authResetVerification = async (req, res) => {
  try {
    // Extract token from the query parameter
    const token = req.query.token;
    if (!token)
      return res.redirect(`http://localhost:3000/?code=401#Reset`);

    // Verify token format
    try {
      jwt.verify(token, resetTokenSecret);
    } catch (error) {
      return res.redirect(`http://localhost:3000/?code=400#Reset`);
    }

    // Check if the token exists in the database
    const tokenDoc = await Token.findOne({ token: token });
    if (!tokenDoc || tokenDoc.expiresAt < Date.now()) {
      return res.redirect(`http://localhost:3000/?code=401#Reset`);
    }

    // Verify user existence
    const email = jwt.decode(token).email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.redirect(`http://localhost:3000/?code=404#Reset`);
    }

   
    //rename this to send to mach the same as login logic
    const tempToken = jwt.sign(
      {
        token,
        isVerified: true,
      },
      resetTokenSecret,
      { expiresIn: "55m" } // Set a new expiration time
    );

    // res.cookie("tempAuthToken", tempToken, { httpOnly: true, maxAge: 600000 }); // 10 minutes
    res.cookie("tempAuthToken", tempToken);
    res.redirect("http://localhost:3000/?#Reset");
  } catch (error) {
    return res.redirect(`http://localhost:3000/?code=500#Reset`);
  }
};

//NOTE : then rest the password

const validateResetPassword = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    .withMessage("Must contain 8 characters and one number"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password confirmation must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[0-9])/)
    .withMessage("Password confirmation must contain 8 characters and one number")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
      
    }),
];

const handlevalidateResetPasswordErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log('i am here')
  if (!errors.isEmpty()) {
    console.log(req.body.password)
    //console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const resetPassword = async (req, res, next) => {
  try {
    const resetToken = req.cookies.tempAuthToken;
    console.log ("the reset cockies is : ",resetToken)
    if (!resetToken) 
      return res.status(401).send("No token found in cookies");

    const decodedTempToken = jwt.verify(resetToken, resetTokenSecret);
    const innerTokenIsVerified = decodedTempToken.isVerified;

    if (!innerTokenIsVerified)
      res.status(401).send("the email is not verified");

    const innerToken = decodedTempToken.token;
    if (!innerToken) 
      return res.status(401).send("Invalid token structure");
    

    // Decode the inner token to extract the email
    const decodedInnerToken = jwt.verify(innerToken, resetTokenSecret);
    const email = decodedInnerToken.email;

    if (!email) {
      return res.status(400).send("Email not found in token");
    }
    //search for the user using the email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const newPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = passwordHash;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,     // Makes the cookie inaccessible to client-side scripts, enhancing security against XSS attacks
      sameSite: 'strict', // Strictly controls when cookies are sent; use 'lax' for less strict control
      path: '/',          // Sets the cookie to be accessible for the entire site
      maxAge: 24 * 60 * 60 * 1000 // Sets the cookie to expire in 24 hours (in milliseconds)
    });
    res.json({ accessToken , message : "the user is exist"});

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
