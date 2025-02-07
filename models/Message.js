const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

  user: {
    type: String,
    lowercase: true,
    required:true
  },

  message: {
    type: String,
    required: [true, "message required"]
  }

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);