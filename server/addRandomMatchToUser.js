const mongoose = require("mongoose");
const User = require("./models/user");
const config = require("./config/database");

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



async function addRandomMatchToUser(username) {
  try {
    // First, fetch the current user to see their existing matches
    const currentUser = await User.findOne({ username: username }).exec();
    if (!currentUser) throw new Error("User not found");

    // Fetch a random user ID excluding the current user and their existing matches
    const randomUser = await User.findOne({
      _id: { $ne: currentUser._id }, // Exclude self
      _id: { $nin: currentUser.matches } // Exclude already matched users
    }).select("_id").exec();

    if (!randomUser) throw new Error("No eligible users found to match");

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
  } finally {
    // Close the mongoose connection
    mongoose.connection.close();
  }
}

// Example usage
addRandomMatchToUser("omar").then(() => {
  console.log("Operation completed");
});
