"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
var AppError = require("./../utils/appError");

var handleCastErrorDB = function handleCastErrorDB(err) {
  var message = "Invalid ".concat(err.path, ": ").concat(err.value, ".");
  return new AppError(message, 400);
};

var handleDuplicateFieldsDB = function handleDuplicateFieldsDB(err) {
  var value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  var message = "Duplicate field value: ".concat(value, ". Please use another value");
  return new AppError(message, 400);
};

var handleValidationErrorDB = function handleValidationErrorDB(err) {
  var errors = Object.values(er.errors).map(function (el) {
    return el.message;
  });
  var message = "Invalid input data. ".concat(errors.join(". "));
  return new AppError(message, 400);
};

var handleJWTError = function handleJWTError() {
  return new AppError("Invalid TOken. Please log in again!", 401);
};

var handleJWTExpiredError = function handleJWTExpiredError() {
  return new AppError("Your Token has expired Please Login in Again!");
};

var sendErrorDev = function sendErrorDev(err, req, res) {
  // rendered pages
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message
    });
  }
};

var sendErrorProd = function sendErrorProd(err, req, res) {
  z; // operational, trusted error: send ,message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // 1 log error
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong"
    });
  }
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    var error = _objectSpread({}, err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};