const mongoose = require("mongoose");
const User = require("./models/user");
const config = require("./config/database");

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addRandomMatchToUser(username) {
  try {
    // Fetch a random user ID (excluding the current user to avoid matching with oneself)
    const randomUser = await User.findOne({ username: { $ne: username } })
      .select("_id")
      .exec();
    if (!randomUser) throw new Error("No other users found");

    // Add the random user's ID to the matches of the specified user
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { matches: randomUser._id } }, // Use $addToSet to avoid duplicates
      { new: true }
    ).populate("matches");

    console.log("Updated User Matches:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding random match:", error);
  }
}

// Example usage
addRandomMatchToUser("omar");
