const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");


const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME }
  );

/**
* @desc    signup New User
* @route   /api/auth/signup
* @method  POST
* @access  public
*/
exports.signup = asyncHandler(async (req, res, next) => {

  const hashedPassword = await hashPassword(req.body.password);

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});


/**
 * @desc    signin  User
 * @route   /api/auth/signin
 * @method  POST
 * @access  public
 */
exports.signin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  
  if (!user ||!(await bcrypt.compare(req.body.password, user.password))) {
    throw new ApiError("Invalid email or password", 401);
  }
  
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

exports.auth = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ApiError("you must login to access this route ", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ApiError("you must login to access this route ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check whether the decoded userId is stored in the database.
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    next(err);
  }
});