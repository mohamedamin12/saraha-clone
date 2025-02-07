const validationMiddleware = require("../middlewares/validationMiddleware");
const { check } = require("express-validator");

exports.messageValidator = [
  check("message").notEmpty().withMessage("message required"),

  validationMiddleware,
];