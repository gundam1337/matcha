const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const getSearchResults =  require ("../controllers/home/getSearchResults")
const getUserData = require("../controllers/home/getUserData")
const sendNotification = require("../controllers/home/sendNotification")
const fetchNotification = require("../controllers/home/fetchNotification")

//this is for the search for an user
router.route("/search").get(verifyTokens,getSearchResults);

//this for getting the user intial data
router.route("/getUserData").get(verifyTokens, getUserData);

//this for the notification 
router.route("/notifications").get(verifyTokens,sendNotification).post(verifyTokens,fetchNotification)

module.exports = router;