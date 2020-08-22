/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const viewController = require("./../controllers/viewsController");

const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/tour/:id/:slug", viewController.getTour);

module.exports = router;
