/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

const Tour = require("../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
const factory = require("./../controllers/handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// update the user
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1)- Create error if user POSTs password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }

  // 2)
  const filterBody = filterObj(req.body, "name", "email");
  // 2)- update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use sign up instead",
  });
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

// don not change assword
// update user
exports.updateUser = factory.updateOne(User);
// delete user
exports.deleteUser = factory.deleteOne(User);
