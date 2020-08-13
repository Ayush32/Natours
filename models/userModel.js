/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// name email, photo, password, cnfrim pass

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    require: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please confirm your password"],
    validate: {
      // thi only works on create and  save!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // hash the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
