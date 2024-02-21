const express = require("express");
const {profileSetup} = require("../controllers/profile/setProfile");
const {getProfile} = require("../controllers/profile/getProfile")
const router = express.Router();
const verifyTokens = require("../controllers/auth/verifyTokens");

//add another midlkware for seting the field is there exist
router
  .route("/profile")
  .post(verifyTokens, profileSetup)
  .get(verifyTokens,getProfile)

// getProfile is a new controller to handle fetching profile data

module.exports = router;
