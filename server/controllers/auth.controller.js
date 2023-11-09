const User = require("../models/user");
const VerificationToken = require("../models/verificationTokensEmail"); // The Verification Token model we just created
const hashPassword = require("../utils/passwordUtils");
const generateVerificationToken = require("../utils/generateVerificationToken");
const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");

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
  //console.log(errors); // If needed for debugging, otherwise it can be removed.
  if (!errors.isEmpty()) {
    // Modify this line to return the actual errors from express-validator
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

//NOTE : Check if user already exists
const checkIfUserAlreadyExists = async (req, res, next) => {
  // Assuming 'User' is your user model and you have defined it somewhere in your project
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ username: name, email: email });

    if (user) {
      // If a user exists, send a response and do not call next()
      return res.status(400).json({ message: "User already exists" });
    } else {
      // If no user is found, proceed to the next middleware
      //return res.status(200).json({ message: "no user is found" });

      next();
    }
  } catch (error) {
    // Properly handle the error
    res
      .status(500)
      .json({ error: "An error occurred while checking the user" });
  }
};

//NOTE :  send a verification email with a token
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    //TODO : add the error handle
    const newUser = new User({ username: name, email: email });
    const savedUser = await newUser.save();

    const token = generateVerificationToken();

    // Create a verification token for this user
    //DONE:  the verificationToken is not in the database
    const verificationToken = new VerificationToken({
      user: savedUser._id, // try to convert the name to the userID
      token: token, // Generate a random token
    });

    // Save the verification token
    await verificationToken.save();

    // Email message and send message
    const createVerificationLink = (token) => {
      const baseUrl = "http://localhost:3001/register";
      return `${baseUrl}?token=${encodeURIComponent(token)}`;
    };

    const verificationLink = createVerificationLink(verificationToken.token);

    prepareEmailContent(verificationLink)
      .then((emailContent) => sendEmail(email, emailContent))
  //     .then(() => {
  //       //console.log("the email has been sent");
  //       res.status(200).send("please check ur email box");
  //     })
  //     // .catch(() => {
  //     //   res.status(400).send("somethis is wrong with our services");
  //     // });
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
  }
  next();
};

//NOTE : verify the email
const verifyEmailToken = async (req, res, next) => {
  //FIXME
  try {
    // Get the token from the request, usually from the query string or in the body
    const { token } = req.query;
    console.log("the token is = ", token);
    // Find the token in the database
    const tokenDoc = await VerificationToken.findOne({ token: token }).exec();
    if (!tokenDoc) {
      //TODOD : to add the date verification
      return res
        .status(400)
        .send("This verification token is invalid or has expired.");
    }
    //DONE: i dont have the token in the user collection
    //DONE : i should found the the user ID in the verifcation DOC uisng the token
    const user = await User.findById(tokenDoc.user).exec();
    if (!user) {
      return res
        .status(400)
        .send("We were unable to find a user for this verification token.");
    }

    if (user.isVerified) {
      return res.status(400).send("This user has already been verified.");
    }

    // Verify the user's email
    //TODO : add the error handel
    user.isVerified = true;
    await user.save();

    // Remove the verification token from the database
    await VerificationToken.findByIdAndRemove(tokenDoc._id).exec();

    // // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error verifying email token:", error);
    res.status(500).send("Internal server error.");
  }
  next();
};

const validateAndSend = [
  registerValidationRules,
  validationResultChecking,
  checkIfUserAlreadyExists,
  sendVerificationEmail,
];

const verifyAndCreatUser = [verifyEmailToken];

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

module.exports = { signin, signout, validateAndSend, verifyAndCreatUser };
