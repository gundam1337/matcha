const User = require("../../models/user");

//->Matching Algorithm :
//Gender
//and Age Filters
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
//Location Filtering

//DONE: remove the duplicate
//TODO : just send the necessary data to the server
//TODO : to calculate the user age

// const calculateAge = (birthdateString) => {
//   const birthDate = new Date(birthdateString);
//   const today = new Date();

//   if (isNaN(birthDate.getTime())) {
//     throw new Error("Invalid birthdate format"); // Handle invalid date
//   }

//   let age = today.getFullYear() - birthDate.getFullYear();

//   // Check if the birthday has not yet occurred this year
//   const monthDifference = today.getMonth() - birthDate.getMonth();
//   const dayDifference = today.getDate() - birthDate.getDate();

//   if (
//     monthDifference < 0 ||
//     (monthDifference === 0 && dayDifference < 0)
//   ) {
//     age -= 1;
//   }

//   return age;
// };

const findMatches = async (req, res, next) => {
  try {
    const username = req.body.username;
    const currentUser = await User.findOne({ username: username });

    if (!currentUser) {
      return res.status(404).send("User not found");
    }
    const excludedUserIds = [
      ...currentUser.likes,
      ...currentUser.dislikes,
      ...currentUser.superlike,
    ];

    const potentialMatches = await User.find({
      _id: { $nin: excludedUserIds }, // Exclude users already liked, disliked, or superliked
      username: { $ne: currentUser.username }, // Exclude the current user
      "profile.gender": "female", // Match preferred gender
    })
      .select([
        "username", // Get username
        "profile.profilePicture", // Get profile picture
        "profile.location.city", // Get city
        "profile.location.country", // Get country
        "profile.bio", // Get bio
        "profile.birthdate", // Get birthdate
      ])
      .limit(10) // Limit to 10 records
      .exec(); // Execute the query

      
      const matchesWithAge = potentialMatches.map((match) => ({
        username: match.username,
        profilePicture: match.profile.profilePicture,
        city: match.profile.location.city,
        country: match.profile.location.country,
        bio: match.profile.bio,
        age: "22", // Calculate age
      }));
      
      res.status(200).json(matchesWithAge);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = findMatches;
