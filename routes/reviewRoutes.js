/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const router = express;

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("User"),
    reviewController.createReview
  );

module.exports = router;
