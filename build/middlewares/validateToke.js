"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRequired = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var authRequired = exports.authRequired = function authRequired(req, res, next) {
  var token = req.cookies.token;
  if (!token) return res.status(401).json(["No token"]);
  _jsonwebtoken["default"].verify(token, _config.TOKEN_SECRET, function (err, user) {
    if (err) return res.status(401).json(['invalid token']);
    req.user = user;
    next();
  });
};