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
      match: { "profile.firstName": { $regex: regex } },
      select: "profile.firstName profile.lastName",
    });
    //send just names to the user 

    const results = {
      likes: user.likes,
      likedBy: user.likedBy,
      matches: user.matches,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = getSearchResults;
