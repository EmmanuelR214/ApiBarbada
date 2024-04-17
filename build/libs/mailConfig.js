"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;
var _config = require("../config.js");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var transporter = exports.transporter = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: _config.mail,
    pass: _config.llave
  }
});