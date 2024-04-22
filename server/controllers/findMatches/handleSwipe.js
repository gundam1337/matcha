const User = require("../../models/user");

async function handleSwipe(req, res) {
  const { username: currentUsername, targetUsername: swipedUsername, action } = req.body;

  try {
    const swipedUser = await User.findOne({ username: swipedUsername });
    const currentUser = await User.findOne({ username: currentUsername });

    if (!swipedUser || !currentUser) {
      return res.status(404).send("User(s) not found");
    }

    if (action === "like") {
      // The current user likes the swiped user
      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { likes: swipedUser._id },
      });

      // Check if the swiped user also likes the current user (mutual liking)
      const doesSwipedUserLikeCurrent = swipedUser.likes.some(
        (likeId) => likeId.toString() === currentUser._id.toString()
      );

      if (doesSwipedUserLikeCurrent) {
        // Mutual like - create a match
        await User.findByIdAndUpdate(swipedUser._id, {
          $addToSet: { matches: currentUser._id },
        });

        await User.findByIdAndUpdate(currentUser._id, {
          $addToSet: { matches: swipedUser._id },
        });

        console.log("Match created!");
      }

    } else if (action === "dislike") {
      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { dislikes: swipedUser._id },
      });

    } else if (action === "superlike") {
      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { superlike: swipedUser._id },
      });

    } else {
      return res.status(400).send("Invalid swipe action");
    }

    res.status(200).send("Action completed successfully");

  } catch (error) {
    console.error("Error during swipe handling:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = handleSwipe;
