const User = require("../../models/user");

const getUserData = async (req, res, next) => {
  try {
    const userId = req.userID;
    const user = await User.findById(userId);

    if (!user) {
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
