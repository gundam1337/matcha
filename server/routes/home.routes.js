const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")
const getUserData = require("../controllers/home/getUserData")


router.use(verifyTokens);

// Define the routes
router.get('/search', getSearchResults);
router.get('/getUserData', getUserData);



module.exports = router;