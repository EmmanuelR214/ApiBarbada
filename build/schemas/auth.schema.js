"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = void 0;
var _zod = require("zod");
var phoneRegExp = /^[0-9 ()+-]{10,15}$/;
var registerSchema = exports.registerSchema = _zod.z.object({
  nombre: _zod.z.string().refine(function (data) {
    return data.trim() !== '';
  }, {
    message: 'Username is required'
  }).refine(function (data) {
    return data.length >= 3 && data.length <= 50;
  }, {
    message: 'Username must be between 3 and 50 characters'
  }),
  telefono: _zod.z.string().refine(function (data) {
    return data.trim() !== '';
  }, {
    message: 'Phone number cannot be empty'
  }).refine(function (data) {
    return phoneRegExp.test(data);
  }, {
    message: 'Formato de numero invalido'
  }),
  password: _zod.z.string().refine(function (data) {
    return data.trim() !== '';
  }, {
    message: 'Password cannot be empty'
  }).refine(function (data) {
    return data.length >= 8;
  }, {
    message: 'Password must be at least 8 characters long'
  })
});

/*

export const registerSchema = z.object({
  nombre: z.string({
    required_error: 'Username is required',
    min: 3,
    max: 50,
    nonempty: true,
  }),
  telefono: z.string({
    required_error: 'Phone number is required',
    min: 10,
    max: 15,
    nonempty: true,
  }),
  contraseña: z.string({
    required_error: 'Password is required',
    min: 8,
    max: 20,
    nonempty: true,
  }),
});

*/