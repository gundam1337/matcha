const express = require("express");

const authRegister = require("../controllers/authRegister"); 
const authLogin = require("../controllers/authLogin"); 
const router = express.Router();

//TODO add the isAuth midllware ; this function check the if the usr is legit
router.use(express.urlencoded({ extended: true }));

router.route("/signin").post(authLogin.login);

router.route("/register").post(authRegister.validateAndSend); 
router.route("/register")
  .get(authRegister.verifyEmailToken);

router.route("/signout").get(authLogin.signout);

module.exports = router;
