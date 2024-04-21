const express = require("express");
//const verifyTokens = require("../controllers/auth/verifyTokens");
const router = express.Router();
const findMatches = require("../controllers/findMatches/findMatches");
const handleSwipe = require("../controllers/findMatches/handleSwipe");

// router.use(verifyTokens);

//TODO : Secure endpoints 

router.post("/findMatches", findMatches);

router.post("/swipe", handleSwipe);

module.exports = router;
