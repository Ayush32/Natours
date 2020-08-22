/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get the tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1 get the data fro the requested tour including review and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "Reviews",
    fields: "review rating user",
  });

  // 2 build template
  res.status(200).render("tour", {
    title: "The Forest Hiker",
    tour,
  });
});
