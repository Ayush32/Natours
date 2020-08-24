"use strict";

/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
var express = require("express");

var viewController = require("./../controllers/viewsController");

var authController = require("../controllers/authController");

var router = express.Router();
router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour); // login

router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/me", authController.protect, viewController.getAccount);
module.exports = router;