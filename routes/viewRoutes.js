/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const viewController = require("./../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get(
  "/tour/:slug",
  authController.isLoggedIn,
  authController.protect,
  viewController.getTour
);

// login
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/me", authController.protect, viewController.getAccount);
router.post(
  "/submit-user-data",
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
