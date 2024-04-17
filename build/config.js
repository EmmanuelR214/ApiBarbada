"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mail = exports.llave = exports.TOKEN_SECRET = exports.PORT = exports.DBUSER = exports.DBPORT = exports.DBPASS = exports.DBHOST = exports.DB = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = process.env.PORT || 3000;
var DBHOST = exports.DBHOST = process.env.DB_HOST || 'localhost';
var DBPORT = exports.DBPORT = process.env.DB_PORT || 3306;
var DBUSER = exports.DBUSER = process.env.DB_USER || 'root';
var DB = exports.DB = process.env.DB_DATABASE || 'labarbada';
var DBPASS = exports.DBPASS = process.env.DB_PASS || '';
var TOKEN_SECRET = exports.TOKEN_SECRET = 'J+wos}+V]ey0v~X';
var llave = exports.llave = 'tuju hwoq gjka vgct';
var mail = exports.mail = 'labarbada23@gmail.com';