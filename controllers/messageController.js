const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");

exports.createMessage = asyncHandler(async (req, res, next) => {
  await Message.create({
    user: req.params.username,
    message: req.body.message
  });
  res.status(201).json({
    status: true,
    message: `message send to ${req.params.username} successfully`
  });
});

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    user: req.user.username
  });
  res.status(200).json({
    status: true,
    messages
  });
});