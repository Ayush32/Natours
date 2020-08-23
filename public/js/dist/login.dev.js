"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _alerts = require("./alerts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
var login = function login(email, password) {
  var res;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/login",
            data: {
              email: email,
              password: password
            }
          }));

        case 3:
          res = _context.sent;

          if (res.data.status === "success") {
            // alert("success", "Logged in successfully");
            window.setTimeout(function () {
              location.assign("/");
            }, 1500);
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          alert("error", _context.t0.response.data.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.login = login;