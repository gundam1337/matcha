const express = require("express");
const authRegister = require("../controllers/authRegister"); 
const authLogin = require("../controllers/authLogin"); 
const authReset = require("../controllers/authReset");
const router = express.Router();

//TODO : add the isAuth midllware ; this function check the if the usr is legit
//TODO : and this routes for the protcted url 


//NOTE : the isAuth is to check every request 

router.route("/signin").post(authLogin.login);

router.route("/forgot-password").post(authReset.forgotPassword);
router.route("/reset-password").post(authReset.reset).get(authReset.authResetVerification);


router.route("/register").post(authRegister.validateAndSend); 
router.route("/register")
  .get(authRegister.verifyEmailToken);

router.route("/signout").get(authLogin.signout);

//TODO : this route is for refreching the access token using the refreshToken
// router.route("/refresh-token").post();

module.exports = router;
