require("dotenv").config({ path: "../config.env" });//FIXME I am not using the .env variables
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const {sendEmail } = require("../utils/sendEmail");

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
//DONE  : Create Refresh- and Accesstoken AND Store Refreshtoken with user in database
//DONE  : Send token. Refreshtoken as a cookie and accesstoken as a regular response

const handleSessionManagement = async (req, res,next) => {
  const { name } = req.body;

  try {
    const user = await findUserByName(name);
    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    const accessToken = jwt.sign(
      { username: user.username },
      accessTokenSecret,
      { expiresIn: "1m" }
    );

    // Create Refresh Token
    const refreshToken = jwt.sign(
      { username: user.username },
      refreshTokenSecret
    );

    // Store Refresh Token with User in Database
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,     // Makes the cookie inaccessible to client-side scripts, enhancing security against XSS attacks
      sameSite: 'strict', // Strictly controls when cookies are sent; use 'lax' for less strict control
      path: '/',          // Sets the cookie to be accessible for the entire site
      maxAge: 24 * 60 * 60 * 1000 // Sets the cookie to expire in 24 hours (in milliseconds)
    });
    // res.json({ accessToken , message : "the user is exist"});

     // Storing tokens in the request object to be used by subsequent middleware
     req.accessToken = accessToken;
     req.refreshToken = refreshToken;
     next();

  } catch (err) {
    console.error("Session Management Error:", err);
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

//NOTE : Two-Factor Authentication Middleware
//DONE : create the content of the email 'a new login is happend '
const sendLoginNotifactionEmail = async (req, res) => {
  //DONE :find the email of the user 
  const email = req.email;
  //DONE : send the email

  sendEmail(email, 'login')
  .then(() => {
      console.log("The email has been sent");
      //res.status(200).json({ message: "Please check your email box" });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).send("Something is wrong with our email services");
      }
    });
  //DONE : end the chain 
  const accessToken = req.accessToken;
  res.json({ accessToken , message : "the user is exist"});
}


const login = [
  validate,
  handleValidationErrors,
  authentication,
  handleSessionManagement,
  sendLoginNotifactionEmail
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

//NOTE this is for sending emails 
// prepareEmailContent(verificationLink)
// .then((emailContent) => {
//   return sendEmail(email, emailContent);
// })
// .then(() => {
//   console.log("The email has been sent");
//   res.status(200).json({ message: "Please check your email box" });
// })
// .catch((error) => {
//   if (!res.headersSent) {
//     res.status(500).send("Something is wrong with our email services");
//   }
// });