const User = require("../../models/user");

const getUserData = async (req, res, next) => {
  
  try {
    
    const userId = req.userID;
    console.log("userID ",userId)
    const user = await User.findOne({ userID: userId });

    if (!user) {
      console.log("user == ",user)
      return res.status(404).send("User not found");
    }
    
    req.user = user; // Add the user data to the req object
    console.log("user is = ", user);
    res.json(req.user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = getUserData;
