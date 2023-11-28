const express = require("express");
const authController = require("../controllers/auth.controller"); 

const authRegister = require("../controllers/authRegister"); 
const authLogin = require("../controllers/authLogin"); 
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.route("/signin").post(authLogin.signin);

router.route("/register").post(authRegister.validateAndSend); 
router.route("/register")
  .get(authRegister.verifyEmailToken);

router.route("/signout").get(authLogin.signout);

module.exports = router;
