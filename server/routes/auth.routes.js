const express = require('express');
const authController = require('../controllers/auth.controller'); // Correct the file path


const router = express.Router();

router.route('/signin')
  .post(authController.signin);

router.route('/register')
  .post(authController.register); // Make sure this function exists in auth.controller.js

router.route('/signout')
  .get(authController.signout);

module.exports = router;
