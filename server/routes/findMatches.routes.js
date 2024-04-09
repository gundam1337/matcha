const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const findMatches =  require ("../controllers/findMatches/findMatches")


router.use(verifyTokens);

// Define the routes
router.get('/findMatches', findMatches);



module.exports = router;