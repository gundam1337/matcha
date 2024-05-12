const User = require("../../models/user");

const getUserMatches = async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  //the userId is undifiend at this point

  const username = req.query.username;
  // console.log("user ID ", username);
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
      res.write(`data: ${JSON.stringify({type: "existed_match", details: matchesInfo})}\n\n`);
    } else {
      res.write("data: []\n\n"); // Send empty array if no user found
    }

    // Set up the change stream to listen for updates on the matches
    //FIXME : fix the format that I send to the end client
    const changeStream = User.watch([
      {
        $match: {
          "updateDescription.updatedFields.matches": { $exists: true },
        },
      },
    ]);


    changeStream.on("change", async (change) => {
      if (change.operationType === "update") {
        const updateFields = change.updateDescription.updatedFields;
        if (updateFields.hasOwnProperty("matches")) {
          // Access the matches array directly if it's the updated field
          const matchesArray = updateFields.matches;
          if (Array.isArray(matchesArray) && matchesArray.length > 0) {
            const latestMatchId = matchesArray[matchesArray.length - 1]; // Get the last element (latest match)

            try {
              // Query the database to fetch the user details using the latestMatchId
              const userData = await User.findById(latestMatchId)
                .select(
                  "username profile.firstName profile.lastName profile.profilePicture"
                )
                .exec();

              if (userData) {
                const userDetail = {
                  username: userData.username,
                  firstName: userData.profile.firstName,
                  lastName: userData.profile.lastName,
                  profilePicture: userData.profile.profilePicture,
                };

                console.log("Sending new match details:", userDetail);
                // Send this data to the client
                res.write(`data: ${JSON.stringify({type: "new_match", details: userDetail})}\n\n`);
              } else {
                console.log("No user found with the given ID:", latestMatchId);
              }
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          } else {
            console.log("Matches array is empty or not an array.");
          }
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
