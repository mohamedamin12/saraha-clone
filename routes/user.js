const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userValidator = require('../validations/usersValidator');

router.post(
  "/signup",
  userValidator.signupValidator,
  userController.signup
);

router.post(
  "/signin",
  userValidator.signinValidator,
  userController.signin
);


module.exports=router