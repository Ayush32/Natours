/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
exports.getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "All Tours",
  });
};

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker",
  });
};
