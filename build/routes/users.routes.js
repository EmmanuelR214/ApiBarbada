"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usersControllers = require("../controllers/users.controllers.js");
var _validatorMiddleware = require("../middlewares/validator.middleware.js");
var _authSchema = require("../schemas/auth.schema.js");
var _saucersControllers = require("../controllers/saucers.controllers.js");
var router = (0, _express.Router)();
//Comprobar si existe un token
router.get('/verify', _usersControllers.verifYToken);

//Alerta a usuario
router.get('/alertloging', _usersControllers.AlertUser);

//traer direccion usuario
router.get('/direcciones/:idUser', _usersControllers.TraerDireccionUser);

//Insertar dioreccion
router.post('/insertarDireccion', _usersControllers.InsertarDireccion);

//CREAR VENTA
router.post('/venta', _saucersControllers.CrearVenta);

//Registro-Login Firbase
router.post('/facegoo', _usersControllers.RegisterFirebase);

//Login user
router.post('/login', _usersControllers.LoginUser);

//Registrar usuario
router.post('/register', _usersControllers.RegisterUser);

//Buscar ciente por telefono
router.post('/searchPhone', _usersControllers.SearchNumberPhoneRegister);

//Enviar codigo
router.post('/sendCodeEmail', _usersControllers.sendEmail);

//Actualizar contraseña por correo
router.post('/recoverPass', _usersControllers.RecoverPasswordEmail);

//cerrar sesiones
router.post('/logout', _usersControllers.PostLogout);
var _default = exports["default"] = router;
/*
//Traer un los clientes
router.get('/clientes/:id', GetClientesId)

//crear un nuevo cliente
router.post('/clientes', PostClientes)

//eliminar un cliente
router.delete('/clientes/:id', DeleteClientes)

//actualizar un cliente (actualiza todos los datos que recibe)
router.put('/clientes/:id', PutClientes)

//actualizar un cliente (actualiza parcialmente)
router.patch('/clientes/:id', PatchClientes)*/