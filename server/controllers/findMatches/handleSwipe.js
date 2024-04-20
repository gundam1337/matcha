// controllers/findMatches/handleSwipe.js
const User = require("../../models/user"); // Assuming you have a User model

async function handleSwipe(req, res) {
  const { userId, targetUserId, action } = req.body;
  console.log("req body ->:", req.body);
  try {
    if (action === "like") {
      await User.findByIdAndUpdate(userId, { $addToSet: { likes: targetUserId } });
      // Optionally, check for match here
      console.log("like");
    } else if (action === "dislike") {
      console.log("dislike");

      await User.findByIdAndUpdate(userId, { $addToSet: { dislikes: targetUserId } });
    } else if (action === "superlike") {

      await User.findByIdAndUpdate(userId, { $addToSet: { superlike: targetUserId } });
      console.log("superlike");
    } else {
      return res.status(400).send("Invalid swipe action");
    }
    res.send(`Swiped ${action} on user ${targetUserId} by user ${userId}`);
  } catch (error) {
    res.status(500).send(error.toString());
  }
}

module.exports = handleSwipe;
