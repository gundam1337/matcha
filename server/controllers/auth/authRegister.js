const User = require("../../models/user");
const VerificationToken = require("../../models/verificationTokensEmail"); // The Verification Token model we just created
const hashPassword = require("../../utils/passwordUtils");
const generateVerificationToken = require("../../utils/generateVerificationToken");
const {sendEmail } = require("../../utils/sendEmail");

const { body, validationResult } = require("express-validator");

const validate = [
  body("name")
    .isLength({ max: 15 })
    .withMessage("Must be 15 characters or less")
    .notEmpty()
    .withMessage("Required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
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

//NOTE : Check if the user already exists
const checkIfUserAlreadyExists = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: name }, { email: email }],
    });

    if (user) {
      if (user.username === name) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (user.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the user" });
  }
  next();
};

//NOTE :  send a verification email with a token
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordHach = await hashPassword(password);

    const newUser = new User({
      username: name,
      email: email,
      passwordHash: passwordHach,
    });
    const savedUser = await newUser.save();
    const token = generateVerificationToken();

    const verificationToken = new VerificationToken({
      user: savedUser._id,
      token: token,
    });

    await verificationToken.save();

    const createVerificationLink = (token) => {
      const baseUrl = "http://localhost:3001/register";
      return `${baseUrl}?token=${encodeURIComponent(token)}`;
    };

    const verificationLink = createVerificationLink(verificationToken.token);

   sendEmail(email, 'verification', verificationLink)
    .then(() => {
        console.log("The email has been sent");
        res.status(200).json({ message: "Please check your email box" });
      })
      .catch((error) => {
        if (!res.headersSent) {
          res.status(500).send("Something is wrong with our email services");
        }
      });
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
  }

};

//NOTE : verify the email
const verifyEmailToken = async (req, res, next) => {
  try {
    const { token } = req.query;
    const tokenDoc = await VerificationToken.findOne({ token: token }).exec();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = new Date();
    //DONE : to add the date verification
    if (!tokenDoc || now - tokenDoc.createdAt.getTime() > oneDay) {
      return res.status(400).json({
        message: "This verification token is invalid or has expired.",
      });
    }
    const user = await User.findById(tokenDoc.user).exec();
    if (!user) {
      return res.status(400).json({
        message: "We were unable to find a user for this verification token.",
      });
    }
    if (user.isVerified) {
      return res.status(400).send("This user has already been verified.");
    }

    user.emailVerified = true;
    await user.save();
    
    await VerificationToken.findByIdAndRemove(tokenDoc._id).exec();
  } catch (error) {
    console.error("Error verifying email token:", error);
    res.status(500).send("Internal server error.");
  }
  res.redirect('http://localhost:3000/?openLogin=true#login');
};

const validateAndSend = [
  validate,
  handleValidationErrors,
  checkIfUserAlreadyExists,
  sendVerificationEmail,
];

module.exports = {validateAndSend, verifyEmailToken };
