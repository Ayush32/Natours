"use strict";

/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
var Tour = require("../models/tourModel");

var catchAsync = require("../utils/catchAsync");

var AppError = require("../utils/appError");

exports.getOverview = catchAsync(function _callee(req, res) {
  var tours;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Tour.find());

        case 2:
          tours = _context.sent;
          // 2) Build template
          // 3) Render that template using tour data from 1
          res.status(200).render("overview", {
            title: "All Tours",
            tours: tours
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getTour = catchAsync(function _callee2(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Tour.findOne({
            slug: req.params.slug
          }).populate({
            path: "Reviews",
            fields: "review rating user"
          }));

        case 2:
          tour = _context2.sent;

          if (tour) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError("There is no tour with that name", 404)));

        case 5:
          // 2 build template
          res.status(200).render("tour", {
            title: "".concat(tour.name),
            tour: tour
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});

exports.getLoginForm = function (req, res) {
  res.status(200).render("login", {
    title: "Log into your account"
  });
};