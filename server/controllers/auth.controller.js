const User = require("../models/user");
const hashPassword = require("../utils/passwordUtils");
const generateVerificationToken = require("../utils/generateVerificationToken");
const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");
const isValidEmail = require("../utils/isValidEmail");

const { body, validationResult } = require("express-validator");

//NOTE :  Validation rules
const registerValidationRules = [
  body("name")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

//NOTE : Validation result checking

const validationResultChecking = (req, res, next) => {
  const errors = validationResult(req);
   console.log(errors); // If needed for debugging, otherwise it can be removed.
   console.log("the user name is = ",req.body.username)

  if (!errors.isEmpty()) {
    // Modify this line to return the actual errors from express-validator
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }
  
  req.validationResult = "ok";
  next();
};

//NOTE : Check if user already exists
//FIXME : 
const checkIfUserAlreadyExists = async (req, res, next) => {
  if (req.validationResult !== "ok") {
    return res.status(400).json({ errors: "something is wrong" });
  }
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ username: name , email : email});
    if (user) {
      res.status(404).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    throw error; // Or handle error as appropriate
  }
  res.status(200).send("ther is no user with this name")
  next();
};

//NOTE : Create a new user instance

const registeration = (req, res, next) => {
  const { username, email, password } = req.body;
  const recipientEmail = req.body.email;

  // (async () => {
  //   try {
  //     const hashedPassword = await hashPassword(req.body.password);
  //     console.log("Hashed Password:", hashedPassword);
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // })();

  // const createVerificationLink = (userId = "test", token) => {
  //   const baseUrl = "https://yourapp.com/verify";
  //   return `${baseUrl}?token=${encodeURIComponent(token)}&userId=${userId}`;
  // };

  // prepareEmailContent(createVerificationLink)
  //   .then((emailContent) => sendEmail(recipientEmail, emailContent))
  //   .catch(console.error);

  res.send("you are in ");
};

const register = [
  registerValidationRules,
  validationResultChecking,
  checkIfUserAlreadyExists,
  registeration,
];

const signin = async (req, res, next) => {
  try {
    console.log("sign in logic");
    // Your sign-in logic here
    res.status(200).send("Sign in successful"); // Example response
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message); // Send back the error
  }
};

const signout = (req, res, next) => {
  console.log("sign out logic");
  // Your sign-out logic here
  res.status(200).send("Sign out successful"); // Example response
};

module.exports = { signin, signout, register };
