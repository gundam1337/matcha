const User = require("../../models/user");
const { bucket } = require("../../DataBase/firebaseConfig")
  
  //return the Public URLs of files insise folder using the userID(the name of the fodler)
  const getUserURLsFiles = async (userId) => {
    try {
     
     
      // List all files in the folder named after userId
      const [files] = await bucket.getFiles({ prefix: `${userId}/` });
      const urls = await Promise.all(files.map(async file => {
        // For each file, generate a signed URL that is publicly accessible
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-17-2025' // Set an expiration date for the URL
        });
        return url;
      }));
  
      return urls;
    } catch (error) {
     // console.error('Error fetching user files:', error);
      return [];  // Return an empty array in case of error
    }
  };
  

const getProfile = async (req, res) => {
    try {
      
      const { username, email } = req.user;
  
      const user = await User.findOne({ username, email });
      //console.log("user is ",user)
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const userID = user.userID;
      
      //const pulicURLs= await getUserFilesPublicUrls(userID) 
      const pulicURLs = await getUserURLsFiles(userID) 
      const firstTwoUrls = pulicURLs.slice(0, 2);
  
  
      // Assuming that the user schema has a 'profile' field with nested properties
      const { profile } = user;
      const profileData = {
        profilePicture: firstTwoUrls,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthdate: profile.birthdate,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        location: profile.location
          ? {
              latitude: profile.location.latitude,
              longitude: profile.location.longitude,
              city: profile.location.city,
              country: profile.location.country,
            }
          : undefined,
        bio: profile.bio,
        interests: profile.hobbies, // Assuming hobbies is the correct field name
      };
  
      res.json(profileData);
    } catch (error) {
        //console.log("error.message",error.message)
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {getProfile}