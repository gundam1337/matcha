const express = require("express");
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")

router.route("/search").get(getSearchResults);

module.exports = router;