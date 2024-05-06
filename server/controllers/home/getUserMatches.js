const User = require("../../models/user");

const getUserMatches = async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  //the userId is undifiend at this point

  const userId = req.query.username;
  console.log("user ID ",userId)
  if (!userId) {
    res.status(400).send("User ID is required");
    return;
  }

  try {
    // Send initial match data
    //TODO modify the format that I should send the end client 
    const user = await User.findById(userId).populate("matches").exec();
    if (user) {
      res.write(`data: ${JSON.stringify(user.matches)}\n\n`);
    } else {
      res.write("data: []\n\n"); // Send empty array if no user found
    }

    // Set up the change stream to listen for updates on the matches
    // const changeStream = User.watch([
    //   {
    //     $match: {
    //       "updateDescription.updatedFields.matches": { $exists: true },
    //     },
    //   },
    // ]);

    // changeStream.on("change", (change) => {
    //   if (change.operationType === "update") {
    //     // Check if the 'matches' array was updated
    //     const updatedMatches = change.updateDescription.updatedFields.matches;
    //     if (updatedMatches) {
    //       // Sending the updated 'matches' array to the client
    //       res.write(`data: ${JSON.stringify(updatedMatches)}\n\n`);
    //     }
    //   }
    // });

    req.on("close", () => {
      //changeStream.close();
      res.end();
    });
  } catch (error) {
    console.error("Error setting up change stream:", error);
    res.status(500).send("Failed to set up change stream");
  }
  // // Send a simple event every second
  // const intervalId = setInterval(() => {
  //   res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  // }, 1000);

  // req.on("close", () => {
  //   clearInterval(intervalId);
  //   res.end();
  // });
};

module.exports = getUserMatches;
