const express = require("express");
const setProfile = require("../controllers/profile/setProfile"); 
const router = express.Router();



router.route("/profile").post(setProfile);


module.exports = router;
