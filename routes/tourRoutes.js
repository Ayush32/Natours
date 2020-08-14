/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const fs = require("fs");
const tourController = require("./../controllers/tourController");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const authController = require("./../controllers/authController");

// router.param('id', tourController.checkId);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
