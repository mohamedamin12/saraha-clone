const validationMiddleware = require("../middlewares/validationMiddleware");
const { check, body } = require("express-validator");
const User = require('../models/User')

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars"),
  check("username")
    .notEmpty()
    .withMessage("username required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars"),
  body("username").custom((username) =>
    User.findOne({ username: username }).then((result) => {
      if (result) {
        return Promise.reject(new Error(` ${username} already exists`));
      }
    })
  ),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars"),
  body("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject(new Error(`passwords must match`));
    }
    return true;
  }),
  check("email").optional().isEmail().withMessage("write correct email"),
  body("email")
    .optional()
    .custom((val) => {
      return User.findOne({ email: val }).then((result) => {
        if (result) {
          return Promise.reject(new Error(`this email ${val} already exists`));
        }
      });
    }),
  validationMiddleware,
];


exports.signinValidator = [
  check("username")
    .notEmpty()
    .withMessage("username required"),
  body("username").custom((username) => {
    return User.findOne({ username: username })
      .then((result) => {
        if (!result) {
          return Promise.reject(new Error(`username :  ${username} not Found`));
        }
        return true;
      })
  }),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars"),

  validationMiddleware,
];