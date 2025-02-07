const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minLength: [3, "Name should be between 3 and 50 characters"],
      maxLength: [30, "Name should be between 3 and 50 characters"],
    },
    email: {
      type: String,
      trim:true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      lowercase:true
    },
    password: {
      type: String,
      required: [true, "password required"],
      minLength: [6, "Name should be between 3 and 50 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);