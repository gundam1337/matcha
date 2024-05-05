const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")
const getUserData = require("../controllers/home/getUserData")
const getUserMatches = require("../controllers/home/getUserMatches")


router.use(verifyTokens);

// Define the routes
router.get('/search', getSearchResults);
router.get('/getUserData', getUserData);

//route for the send new matches
//todo move this route outise 
router.get('/matches',)



module.exports = router;