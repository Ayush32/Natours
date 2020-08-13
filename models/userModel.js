/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const mongoose = require("mongoose");

// name email, photo, password, cnfrim pass

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    require: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  photo: [String],

  password: {
      type: String,
      required: true
  }
  confirmPassword : {
      type: String,
      require: true

  }
});

const User = mongoose.model('User', userSchema)
module.exports = User
