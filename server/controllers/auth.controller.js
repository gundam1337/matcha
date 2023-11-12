const User = require("../models/user");
const VerificationToken = require("../models/verificationTokensEmail"); // The Verification Token model we just created
const hashPassword = require("../utils/passwordUtils");
const generateVerificationToken = require("../utils/generateVerificationToken");
const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");


//NOTE :  Validation rules

const validateRegistration = (req, res, next) => {
  
  const { name, email, password } = req.body;
   const errors = [];
  if (!name || name.length < 5) {
    errors.push("Username must be at least 5 characters long");
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Must be a valid email address");
  }

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message : "review you inputs name,email and password"});
  }
  next();
};

//NOTE : Check if user already exists
const checkIfUserAlreadyExists = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ username: name, email: email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the user" });
  }
};

//NOTE :  send a verification email with a token
const sendVerificationEmail = async (req, res, next) => {
  //TODO sendVerificationEmail error: MongoServerError: E11000 duplicate key error collection
  try {
    const { name, email, password } = req.body;
    const passwordHach = hashPassword(password);
    console.log("the hached password is ", passwordHach);
    //DONE : save the use info
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
      .then((emailContent) => {
        return sendEmail(email, emailContent);
      })
      .then((data) => {
        console.log("the send email output ",data)
        console.log("The email has been sent");
        res.status(200).send("Please check your email box");
      })
      .catch((error) => {
        // It's important to only send one response. So, check if the headers have already been sent.
        if (!res.headersSent) {
          res.status(500).send("Something is wrong with our email services");
        }
      });
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
  }
  //next();
};

//NOTE : verify the email
const verifyEmailToken = async (req, res, next) => {
  
  try {
    // Get the token from the request, usually from the query string or in the body
    const { token } = req.query;
    console.log("the token is = ", token);
    // Find the token in the database
    const tokenDoc = await VerificationToken.findOne({ token: token }).exec();
    //TODO : to add the date verification
    //TODO : Delete the user 
    if (!tokenDoc) {
      return res
        .status(400)
        .json({message :"This verification token is invalid or has expired." })
    }
    const user = await User.findById(tokenDoc.user).exec();
    if (!user) {
      return res
        .status(400)
        .json( {message : "We were unable to find a user for this verification token."})
    }

    if (user.isVerified) {
      return res.status(400).send("This user has already been verified.");
    }

    //DONE : Verify the user's email
    //TODO : add the error handel
    user.isVerified = true;
    await user.save();

    // Remove the verification token from the database
    await VerificationToken.findByIdAndRemove(tokenDoc._id).exec();
  } catch (error) {
    console.error("Error verifying email token:", error);
    res.status(500).send("Internal server error.");
  }

  res.status(200)
        .json( {message : "We were able to add the user for this verification token."})
};

const validateAndSend = [
  validateRegistration,
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

module.exports = { signin, signout, validateAndSend , verifyAndCreatUser };

