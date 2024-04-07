const User = require("../../models/user");

const getSearchResults = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
      return res.status(400).send({ message: "Search term is required." });
    }

    const regex = new RegExp("^" + searchTerm, "i");

    const userTosearch = req.user;
    const user = await User.findOne({
      $or: [{ username: userTosearch.username }, { email: userTosearch.email }],
    }).populate({
      path: "likes likedBy matches",
      match: { username: { $regex: regex } },
      select: "username",
      options: { limit: 7 },
    });

    const likesUsernames = user.likes.map((like) => like.username);
    const likedByUsernames = user.likedBy.map((likedBy) => likedBy.username);
    const matchesUsernames = user.matches.map((match) => match.username);

    // If you need to combine all usernames into one array
    const closeUsers = [
      ...likesUsernames,
      ...likedByUsernames,
      ...matchesUsernames,
    ];

    if (closeUsers.length === 0) {
      // Perform a global search
      const globalResults = await User.find({ username: { $regex: regex } })
        .select("username")
        .limit(7);
      const usernames = globalResults.map((result) => result.username);
      console.log("usernames : ", usernames);

      // Return global search results
      return res.status(200).json({ usernames });
    } else {
      // Return original results
    

      return res.status(200).json(closeUsers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = getSearchResults;
