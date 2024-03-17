const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")

router.route("/search").get(verifyTokens,getSearchResults);

module.exports = router;