const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")
const getUserData = require("../controllers/home/getUserData")

router.route("/search").get(verifyTokens,getSearchResults);

router.route("/getUserData").get(verifyTokens, getUserData);

module.exports = router;