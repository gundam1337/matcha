const express = require("express");
const setProfile = require("../controllers/profile/setProfile"); 
const router = express.Router();
const verifyTokens = require('../controllers/auth/verifyTokens');
const multer = require("multer");

const upload = multer(); // Initialize multer


router.route("/profile").post(verifyTokens,upload.any(),setProfile);

module.exports = router;
