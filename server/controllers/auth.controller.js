//const USER = require("./models/user");
const hashPassword = require("../utils/passwordUtils");
const generateVerificationToken = require("../utils/generateVerificationToken");
const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");
const isValidEmail = require("../utils/isValidEmail");


const register = (req, res, next) => {
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
        //console.log("Hashed Password:", hashedPassword);
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
  
    res.send("you are in ");
  };


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
module.exports = { signin, signout ,register};

