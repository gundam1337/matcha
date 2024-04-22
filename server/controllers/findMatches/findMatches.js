const User = require("../../models/user");

//->Matching Algorithm :
//Gender and Age Filters
//Location Filtering

//TODO : remove the duplicate
//TODO : just send the necessary data to the server
//TODO : to calculate the user age

const findMatches = async (req, res, next) => {
  try {
    const username = req.body.username;
    const currentUser = await User.findOne({ username: username });

    if (!currentUser) {
      return res.status(404).send("User not found");
    }

    const potentialMatches = await User.find({
      username: { $ne: username }, // Exclude the current user
      "profile.gender": "female", // Match preferred gender
      // "profile.birthdate": {
      //   $gte: new Date(
      //     new Date().setFullYear(
      //       new Date().getFullYear() - currentUser.preferences.ageRange.max
      //     )
      //   ),
      //   $lte: new Date(
      //     new Date().setFullYear(
      //       new Date().getFullYear() - currentUser.preferences.ageRange.min
      //     )
      //   ),
      // },
    })
      .limit(10) // Limit to 10 records
      .exec(); // Execute the query

    res.status(200).json(potentialMatches);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = findMatches;
