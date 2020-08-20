/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document find with this ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
