const express = require("express");
//const verifyTokens = require("../controllers/auth/verifyTokens");
const router = express.Router();
const findMatches = require("../controllers/findMatches/findMatches");
const handleSwipe = require("../controllers/findMatches/handleSwipe");

const getUserMatches = require("../controllers/home/getUserMatches")


// router.use(verifyTokens);

//TODO : Secure endpoints 

router.post("/findMatches", findMatches);

router.post("/swipe", handleSwipe);

router.get('/matches',getUserMatches)

module.exports = router;
