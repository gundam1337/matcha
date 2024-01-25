const express = require("express");
const setProfile = require("../controllers/profile/setProfile"); 
const router = express.Router();
const verifyTokens = require('../controllers/auth/verifyTokens');

router.route("/profile").post(verifyTokens,setProfile);


module.exports = router;
