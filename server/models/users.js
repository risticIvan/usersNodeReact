const mongoose = require("mongoose");

const Shema = mongoose.Schema;

const User = new Shema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  }
});

module.exports = mongoose.model("users", User);
