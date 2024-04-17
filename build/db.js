"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coonexion = void 0;
var _promise = require("mysql2/promise");
var _config = require("./config.js");
var _dns = _interopRequireDefault(require("dns"));
var _net = _interopRequireDefault(require("net"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Coonexion = exports.Coonexion = (0, _promise.createPool)({
  host: _config.DBHOST,
  user: _config.DBUSER,
  password: _config.DBPASS,
  database: _config.DB,
  port: _config.DBPORT
});