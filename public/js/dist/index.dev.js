"use strict";

require("@babel/polyfill");

var _mapbox = require("./mapbox");

var _login = require("./login");

var _updateSettings = require("./updateSettings");

var _alerts = require("./alerts");

/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
var mapBox = document.getElementById("map");
var loginForm = document.querySelector(".form--login");
var logOutBtn = document.querySelector(".nav__el--logout");
var userDataForm = document.querySelector(".form-user-data");
var userPasswordForm = document.querySelector(".form-user-password"); // value
// delegation

if (mapBox) {
  var locations = JSON.parse(mapBox.dataset.locations);
  (0, _mapbox.displayMap)(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    (0, _login.login)(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", _login.logout);
if (userDataForm) userDataForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  (0, _updateSettings.updateSettings)({
    name: name,
    email: email
  }, "data");
});
if (userPasswordForm) userDataForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var passwordCurrent = document.getElementById("password-current").value;
  var password = document.getElementById("password").value;
  var passwordConfirm = document.getElementById("password-confirm").value;
  (0, _updateSettings.updateSettings)({
    name: name,
    email: email
  }, "data");
});