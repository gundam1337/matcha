const jwt = require('jsonwebtoken');
const User = require("../models/user");
const bcrypt = require('bcrypt');

const { prepareEmailContent, sendEmail } = require("../utils/sendEmail");


//TODO Two-Factor Authentication  
//TODO CAPTCHA or reCAPTCHA Integration


const signin = async (req, res, next) => {
    const { name, password } = req.body;
    console.log(name,password)
    try {
      // Extract email and password from request body
      const { name, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Compare submitted password with hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }
  
      // Create and assign a token
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.header('auth-token', token).send(token);
  
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
  
  const signout = (req, res, next) => {
    console.log("sign out logic");
    // Your sign-out logic here
    res.status(200).send("Sign out successful"); // Example response
  };
  
  module.exports = { signin, signout};
  