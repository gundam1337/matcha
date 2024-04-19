const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const findMatches =  require ("../controllers/findMatches/findMatches")
const handleSwipe = require("../controllers/findMatches/handleSwipe");


router.use(verifyTokens);

// Define the routes
router.get('/findMatches', findMatches);

// Unified swipe endpoint
router.post('/swipe', handleSwipe);



module.exports = router;