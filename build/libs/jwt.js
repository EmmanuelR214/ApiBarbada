"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAccessToken = CreateAccessToken;
var _config = require("../config.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function CreateAccessToken(payload) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].sign(payload, _config.TOKEN_SECRET, {
      expiresIn: '1d'
    }, function (err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
}