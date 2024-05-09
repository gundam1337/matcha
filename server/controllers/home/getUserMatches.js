const User = require("../../models/user");

const getUserMatches = async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  //the userId is undifiend at this point

  const username = req.query.username;
  console.log("user ID ", username);
  if (!username) {
    res.status(400).send("User ID is required");
    return;
  }

  try {
    // Send initial match data
    //DONE modify the format that I should send the end client
    const user = await User.findOne({ username: username })
      .populate({
        path: "matches",
        select:
          "username profile.firstName profile.lastName profile.profilePicture",
      })
      .exec();

    if (user) {
      // Map over the matches to restructure the data as needed
      const matchesInfo = user.matches.map((match) => ({
        username: match.username,
        firstName: match.profile.firstName,
        lastName: match.profile.lastName,
        profilePicture: match.profile.profilePicture,
      }));
      res.write(`data: ${JSON.stringify(matchesInfo)}\n\n`);
    } else {
      res.write("data: []\n\n"); // Send empty array if no user found
    }

    // Set up the change stream to listen for updates on the matches
    //TODO : fix the format that I send to the end client 
    const changeStream = User.watch([
      {
        $match: {
          "updateDescription.updatedFields.matches": { $exists: true },
        },
      },
    ]);

    changeStream.on("change", (change) => {
      if (change.operationType === "update") {
        // Check if the 'matches' array was updated
        const updatedMatches = change.updateDescription.updatedFields.matches;
        if (updatedMatches) {
          // Sending the updated 'matches' array to the client
          res.write(`data: ${JSON.stringify(updatedMatches)}\n\n`);
        }
      }
    });

    req.on("close", () => {
      //changeStream.close();
      res.end();
    });
  } catch (error) {
    console.error("Error setting up change stream:", error);
    res.status(500).send("Failed to set up change stream");
  }
};

module.exports = getUserMatches;
