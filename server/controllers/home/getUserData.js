const User = require("../../models/user");

const getUserData = async (req, res, next) => {
  try {
    const userId = req.userID;
    const user = await User.findOne({ userID: userId })
      .select(
        "username profile.profilePicture profile.firstName profile.lastName profile.bio likedBy matches -_id"
      )
      .populate("likedBy", "username")
      .populate("matches", "username")
      .lean();

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    res.json(req.user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = getUserData;
