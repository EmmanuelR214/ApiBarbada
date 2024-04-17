"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _adminControllers = require("../controllers/admin.controllers.js");
var _validateToke = require("../middlewares/validateToke.js");
var router = (0, _express.Router)();

//Comprobar Usuario
router.get('/verify-admin', _adminControllers.verifYTokenAdmin);

//Traer tofos los clientes
router.post('/clientes', _validateToke.authRequired, _adminControllers.GetClientes);

//Login Admin
router.post('/login-admin', _adminControllers.LoginAdmin);
var _default = exports["default"] = router; // //Traer datos 
// router.get('/datos', DataForNewPlatillo)