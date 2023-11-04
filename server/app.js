require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//FIXME: mongoose.model() 
//FIXME: dont push the .env file to the git 
const USER = require("./models/user");
const hashPassword = require("./utils/passwordUtils");
const generateVerificationToken = require("./utils/generateVerificationToken");
const { prepareEmailContent, sendEmail } = require("./utils/sendEmail");
const isValidEmail = require("./utils/isValidEmail");

//TODO: serve the image (the logo image ) using express router
//TODO : Handle Verification
//TODO : Store the Token (creation date, and an expiration date.)

// DONE :connection to the MongoDB atlas cloud
//DONE : the goal is connect the to db and log it ot the console (DONE)
//TODO :make the the connection in the await and synch style

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASENAME = process.env.DB_DATABASE;

// const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@atlascluster.3ngvfcu.mongodb.net/${DB_DATABASENAME}`; 

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//     console.log("Connected to MongoDB");

//     const userAccountSchema = new mongoose.Schema({}, { strict: false }); // Using a non-strict schema to fetch all fields without defining them
//     const UserAccount = mongoose.model(
//       "UserAccount",
//       userAccountSchema,
//       "user_account"
//     ); // 'user_account' is the collection name

//     return UserAccount.find({}).exec(); // Fetching all documents
//   })
//   .then((documents) => {
//     console.log(documents);
//   })
//   .catch((err) => {
//     console.error("Error connecting to the database", err);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

//
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

//1)  Node.js middleware and global middleware and seting headres
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//2) server the static file from the build folder
app.use(express.static(path.join(__dirname, "..", "build")));

//3)-a routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// -b POST /register endpoint

router.route("/register/").post((req, res) => {
  // const newUser = new USER();
  const recipientEmail = req.body.email;
 
  //TODO : searche for the user in the database
  //TODO : if the user alerdy exit dont create the user in DB 
  //TODO : if the user is new to the create a user in db with no active account
  //TODO :  Store the token in your database associated with the user record.

  //DONE : Verifying the email pattern
    if (!isValidEmail(recipientEmail))
    return ;
  //DONE : hach the password 
  (async () => {
    try {
      const hashedPassword = await hashPassword(req.body.password);
      console.log("Hashed Password:", hashedPassword);
    } catch (error) {
      console.error("Error:", error.message);
    }
  })();

  //DONE : Compose the Verification Email
  
  const createVerificationLink = (userId = "test", token) => {
    const baseUrl = "https://yourapp.com/verify";
    return `${baseUrl}?token=${encodeURIComponent(token)}&userId=${userId}`;
  };
 

  //DONE : Send the Email
  prepareEmailContent(createVerificationLink)
    .then((emailContent) => sendEmail(recipientEmail, emailContent))
    .catch(console.error);

  //res.send("you are in ");
});

router.route("/login").post((req, res) => {
  console.log(req.body);
  res.send("login is ok");
});

// verfication of the email link
router.route("/verify").get(
  (req, res) => {
    //TODO : if the email is verfied (Validating the Token)then you can store the user  and Activate the Account
    //TODO :and that mean I should verfiy the link i sent  
    //TODO : if the user doesnt use the like i should delet the user in database  
    res.send("registration is ok");
  }
);

// 4) Mount the router
app.use("/", router);

// 5) the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
