const express = require("express");
const authController = require("../controllers/auth.controller"); 

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.route("/signin").post(authController.signin);

router.route("/register").post(authController.validateAndSend); 
router.route("/register")
  .get(authController.verifyEmailToken);

router.route("/signout").get(authController.signout);

module.exports = router;
