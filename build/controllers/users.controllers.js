"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifYToken = exports.sendEmail = exports.SearchNumberPhoneRegister = exports.RegisterUser = exports.RegisterFirebase = exports.RecoverPasswordEmail = exports.PostLogout = exports.LoginUser = exports.AlertUser = void 0;
var _db = require("../db.js");
var _uuid = require("uuid");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jwt = require("../libs/jwt.js");
var _authMail = require("../middlewares/authMail.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } //Conextion
//Dependencias
//Configuraciones
//Encriptar datos
var hashData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var saltRounds, salt, Encrypt;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          saltRounds = 10;
          _context.next = 4;
          return _bcrypt["default"].genSalt(saltRounds);
        case 4:
          salt = _context.sent;
          _context.next = 7;
          return _bcrypt["default"].hash(data, salt);
        case 7:
          Encrypt = _context.sent;
          return _context.abrupt("return", Encrypt);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error encriptar datos:', _context.t0);
          throw _context.t0;
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function hashData(_x) {
    return _ref.apply(this, arguments);
  };
}();

//Comparar datos encriptados
var compareData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, hash) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _bcrypt["default"].compare(data, hash);
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function compareData(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var verifYToken = exports.verifYToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var token;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.cookies.token;
          if (token) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(401).json(['Unauthorized']));
        case 4:
          _jsonwebtoken["default"].verify(token, _config.TOKEN_SECRET, /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(err, user) {
              var _yield$Coonexion$quer, _yield$Coonexion$quer2, userFound, _userFound, _userFound$, dataUser;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 2;
                      break;
                    }
                    return _context3.abrupt("return", res.status(401).json(['Unauthorized']));
                  case 2:
                    _context3.next = 4;
                    return _db.Coonexion.query('CALL obtenerUsuarioID(?)', [user.id]);
                  case 4:
                    _yield$Coonexion$quer = _context3.sent;
                    _yield$Coonexion$quer2 = _slicedToArray(_yield$Coonexion$quer, 1);
                    userFound = _yield$Coonexion$quer2[0];
                    if (userFound[0]) {
                      _context3.next = 9;
                      break;
                    }
                    return _context3.abrupt("return", res.status(401).json(['Unauthorized']));
                  case 9:
                    _userFound = _slicedToArray(userFound, 1), _userFound$ = _slicedToArray(_userFound[0], 1), dataUser = _userFound$[0];
                    console.log(dataUser);
                    return _context3.abrupt("return", res.json({
                      id: dataUser.id_usuario,
                      rol: dataUser.roles
                      // nombre: dataUser.nombre,
                      // telefono: dataUser.telefono
                    }));
                  case 12:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          }());
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json(['Error del servidor']);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function verifYToken(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

//Actualiza contraseña por correo
var RecoverPasswordEmail = exports.RecoverPasswordEmail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, email, password, id, ip, pass, _yield$Coonexion$exec, _yield$Coonexion$exec2, update, _yield$Coonexion$exec3, _yield$Coonexion$exec4, _yield$Coonexion$exec5, result, token;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, id = _req$body.id;
          ip = req.ip;
          _context5.next = 5;
          return hashData(password);
        case 5:
          pass = _context5.sent;
          console.log('chi');
          _context5.next = 9;
          return _db.Coonexion.execute('CALL ActualizarPassword(?,?,?,?)', [pass, email, id, ip]);
        case 9:
          _yield$Coonexion$exec = _context5.sent;
          _yield$Coonexion$exec2 = _slicedToArray(_yield$Coonexion$exec, 1);
          update = _yield$Coonexion$exec2[0];
          if (!(update.affectedRows <= 0)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(400).json(['No se pudo actualizar la contraseña']));
        case 14:
          _context5.next = 16;
          return _db.Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [email]);
        case 16:
          _yield$Coonexion$exec3 = _context5.sent;
          _yield$Coonexion$exec4 = _slicedToArray(_yield$Coonexion$exec3, 1);
          _yield$Coonexion$exec5 = _slicedToArray(_yield$Coonexion$exec4[0], 1);
          result = _yield$Coonexion$exec5[0];
          if (!(result.length > 0)) {
            _context5.next = 28;
            break;
          }
          _context5.next = 23;
          return (0, _jwt.CreateAccessToken)({
            id: result[0].id_usuario
          });
        case 23:
          token = _context5.sent;
          res.cookie('token', token);
          res.status(200).json([result[0]]);
          _context5.next = 29;
          break;
        case 28:
          res.status(200).json(['si']);
        case 29:
          _context5.next = 35;
          break;
        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json(['Error al actualizar la contraseña']);
        case 35:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 31]]);
  }));
  return function RecoverPasswordEmail(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

//Enviar email de verificación
var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var mail, _yield$Coonexion$exec6, _yield$Coonexion$exec7, _yield$Coonexion$exec8, result, caracteres, codigoSecreto, i;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          mail = req.body.mail;
          _context6.next = 4;
          return _db.Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [mail]);
        case 4:
          _yield$Coonexion$exec6 = _context6.sent;
          _yield$Coonexion$exec7 = _slicedToArray(_yield$Coonexion$exec6, 1);
          _yield$Coonexion$exec8 = _slicedToArray(_yield$Coonexion$exec7[0], 1);
          result = _yield$Coonexion$exec8[0];
          if (result[0]) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(400).json(['El correo no esta registrado']));
        case 10:
          caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          codigoSecreto = '';
          for (i = 0; i < 6; i++) {
            codigoSecreto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
          }
          _context6.next = 15;
          return (0, _authMail.verifyMail)(mail, codigoSecreto);
        case 15:
          res.status(200).json([codigoSecreto, result[0].id_usuario]);
          _context6.next = 21;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json(['Error al enviar el código']);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function sendEmail(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

//Login de facebook y google
var RegisterFirebase = exports.RegisterFirebase = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, uid, correo, telefono, message, ip, tel, rol, estado, _yield$Coonexion$exec9, _yield$Coonexion$exec10, _yield$Coonexion$exec11, result, mensaje, token, _yield$Coonexion$exec12, _yield$Coonexion$exec13, _yield$Coonexion$exec14, repeaterMail, _mensaje, pass, _yield$Coonexion$exec15, _yield$Coonexion$exec16, _yield$Coonexion$exec17, lookUser, _token;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, uid = _req$body2.uid, correo = _req$body2.correo, telefono = _req$body2.telefono, message = _req$body2.message;
          ip = req.ip;
          tel = telefono ? telefono : '';
          rol = 1;
          estado = 1;
          _context7.next = 8;
          return _db.Coonexion.execute('CALL ObtenerUsuarioID(?)', [uid]);
        case 8:
          _yield$Coonexion$exec9 = _context7.sent;
          _yield$Coonexion$exec10 = _slicedToArray(_yield$Coonexion$exec9, 1);
          _yield$Coonexion$exec11 = _slicedToArray(_yield$Coonexion$exec10[0], 1);
          result = _yield$Coonexion$exec11[0];
          if (!(result.length > 0)) {
            _context7.next = 24;
            break;
          }
          mensaje = "El usuario ".concat(correo, " inicio s\xE9sion con ").concat(message);
          _context7.next = 16;
          return _db.Coonexion.execute('RegistroBitacoraUsuario(?,?,?)', [uid, ip, mensaje]);
        case 16:
          _context7.next = 18;
          return (0, _jwt.CreateAccessToken)({
            id: uid
          });
        case 18:
          token = _context7.sent;
          res.cookie('token', token);
          res.status(200).json([result[0], 'login']);
          return _context7.abrupt("return");
        case 24:
          _context7.next = 26;
          return _db.Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [correo]);
        case 26:
          _yield$Coonexion$exec12 = _context7.sent;
          _yield$Coonexion$exec13 = _slicedToArray(_yield$Coonexion$exec12, 1);
          _yield$Coonexion$exec14 = _slicedToArray(_yield$Coonexion$exec13[0], 1);
          repeaterMail = _yield$Coonexion$exec14[0];
          if (!(repeaterMail.length > 0)) {
            _context7.next = 32;
            break;
          }
          return _context7.abrupt("return", res.status(400).json(['El correo ya está en uso']));
        case 32:
          _mensaje = "Nuevo usuario registrado con ".concat(message);
          _context7.next = 35;
          return hashData(uid);
        case 35:
          pass = _context7.sent;
          _context7.next = 38;
          return _db.Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)', [uid, correo, tel, pass, estado, rol, ip, _mensaje]);
        case 38:
          _context7.next = 40;
          return _db.Coonexion.execute('CALL ObtenerUsuarioID(?)', [uid]);
        case 40:
          _yield$Coonexion$exec15 = _context7.sent;
          _yield$Coonexion$exec16 = _slicedToArray(_yield$Coonexion$exec15, 1);
          _yield$Coonexion$exec17 = _slicedToArray(_yield$Coonexion$exec16[0], 1);
          lookUser = _yield$Coonexion$exec17[0];
          _context7.next = 46;
          return (0, _jwt.CreateAccessToken)({
            id: uid
          });
        case 46:
          _token = _context7.sent;
          res.cookie('token', _token);
          res.status(200).json([lookUser, 'register']);
        case 49:
          _context7.next = 55;
          break;
        case 51:
          _context7.prev = 51;
          _context7.t0 = _context7["catch"](0);
          console.error('Error al buscar usuario en la base de datos', _context7.t0);
          res.status(500).json(['Error interno del servidor']);
        case 55:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 51]]);
  }));
  return function RegisterFirebase(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

//login usuarios
var LoginUser = exports.LoginUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, param, password, ip, _yield$Coonexion$exec18, _yield$Coonexion$exec19, _yield$Coonexion$exec20, result, user, PasswordValid, _yield$Coonexion$exec21, _yield$Coonexion$exec22, _yield$Coonexion$exec23, bitacora, mensaje, token;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body3 = req.body, param = _req$body3.param, password = _req$body3.password;
          ip = req.ip;
          _context8.next = 5;
          return _db.Coonexion.execute('CALL LoginCliente(?)', [param]);
        case 5:
          _yield$Coonexion$exec18 = _context8.sent;
          _yield$Coonexion$exec19 = _slicedToArray(_yield$Coonexion$exec18, 1);
          _yield$Coonexion$exec20 = _slicedToArray(_yield$Coonexion$exec19[0], 1);
          result = _yield$Coonexion$exec20[0];
          if (result[0]) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(400).json(['El usuario no existe']));
        case 11:
          user = result[0];
          _context8.next = 14;
          return compareData(password, user.passwordUs);
        case 14:
          PasswordValid = _context8.sent;
          if (PasswordValid) {
            _context8.next = 17;
            break;
          }
          return _context8.abrupt("return", res.status(400).json(["Contraseña incorrecta"]));
        case 17:
          _context8.next = 19;
          return _db.Coonexion.execute('CALL ObtenerBitacoraUsuario(?)', [user.id_usuario]);
        case 19:
          _yield$Coonexion$exec21 = _context8.sent;
          _yield$Coonexion$exec22 = _slicedToArray(_yield$Coonexion$exec21, 1);
          _yield$Coonexion$exec23 = _slicedToArray(_yield$Coonexion$exec22[0], 1);
          bitacora = _yield$Coonexion$exec23[0];
          mensaje = ip === bitacora[0].direccion_ip ? "El usuario ".concat(user.correo, " inici\xF3 sesi\xF3n desde la misma plataforma") : "El usuario ".concat(user.correo, " inici\xF3 sesi\xF3n desde otro dispositivo");
          _context8.next = 26;
          return _db.Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [user.id_usuario, ip, mensaje]);
        case 26:
          _context8.next = 28;
          return (0, _jwt.CreateAccessToken)({
            id: user.id_usuario
          });
        case 28:
          token = _context8.sent;
          // const oneDayInSeconds = 24 * 60 * 60;
          // const cookieOptions = {
          //     maxAge: oneDayInSeconds * 1000, // Convertir segundos a milisegundos
          //     httpOnly: true,
          //     // Puedes agregar otras opciones como 'secure' si tu aplicación es HTTPS
          // };
          res.cookie('token', token, {});
          // ,{ maxAge: 86400000, httpOnly: true, sameSite: 'none', secure: true, httpOnly: false}
          res.json({
            user: user
          });
          _context8.next = 37;
          break;
        case 33:
          _context8.prev = 33;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).json(['Error al intentar iniciar sesion']);
        case 37:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 33]]);
  }));
  return function LoginUser(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

//Registrar usuario nuevo
var RegisterUser = exports.RegisterUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body4, uid, correo, telefono, password, ip, rol, estado, newId, mensaje, _yield$Coonexion$exec24, _yield$Coonexion$exec25, _yield$Coonexion$exec26, repeaterMail, pass, _yield$Coonexion$exec27, _yield$Coonexion$exec28, _yield$Coonexion$exec29, _yield$Coonexion$exec30, dataUser, token;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body4 = req.body, uid = _req$body4.uid, correo = _req$body4.correo, telefono = _req$body4.telefono, password = _req$body4.password;
          ip = req.ip;
          rol = 1;
          estado = 1;
          newId = uid ? uid : (0, _uuid.v4)();
          mensaje = "Nuevo usuario registrado";
          _context9.next = 9;
          return _db.Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [correo]);
        case 9:
          _yield$Coonexion$exec24 = _context9.sent;
          _yield$Coonexion$exec25 = _slicedToArray(_yield$Coonexion$exec24, 1);
          _yield$Coonexion$exec26 = _slicedToArray(_yield$Coonexion$exec25[0], 1);
          repeaterMail = _yield$Coonexion$exec26[0];
          if (!(repeaterMail.length > 0)) {
            _context9.next = 15;
            break;
          }
          return _context9.abrupt("return", res.status(400).json(['El correo ya está en uso']));
        case 15:
          _context9.next = 17;
          return hashData(password);
        case 17:
          pass = _context9.sent;
          _context9.next = 20;
          return _db.Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)', [newId, correo, telefono, pass, estado, rol, ip, mensaje]);
        case 20:
          _context9.next = 22;
          return _db.Coonexion.execute('CALL obtenerUsuarioID(?)', [newId]);
        case 22:
          _yield$Coonexion$exec27 = _context9.sent;
          _yield$Coonexion$exec28 = _slicedToArray(_yield$Coonexion$exec27, 1);
          _yield$Coonexion$exec29 = _slicedToArray(_yield$Coonexion$exec28[0], 1);
          _yield$Coonexion$exec30 = _slicedToArray(_yield$Coonexion$exec29[0], 1);
          dataUser = _yield$Coonexion$exec30[0];
          _context9.next = 29;
          return (0, _jwt.CreateAccessToken)({
            id: newId
          });
        case 29:
          token = _context9.sent;
          res.cookie('token', token);
          res.json({
            dataUser: dataUser
          });
          _context9.next = 37;
          break;
        case 34:
          _context9.prev = 34;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json(['Error al crear usuario']);
        case 37:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 34]]);
  }));
  return function RegisterUser(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

//Buscar usuario por numero de telefono
var SearchNumberPhoneRegister = exports.SearchNumberPhoneRegister = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var telefono, _yield$Coonexion$exec31, _yield$Coonexion$exec32, _yield$Coonexion$exec33, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          telefono = req.body.telefono;
          _context10.next = 4;
          return _db.Coonexion.execute('CALL ObtenerUsuarioTelefono(?)', [telefono]);
        case 4:
          _yield$Coonexion$exec31 = _context10.sent;
          _yield$Coonexion$exec32 = _slicedToArray(_yield$Coonexion$exec31, 1);
          _yield$Coonexion$exec33 = _slicedToArray(_yield$Coonexion$exec32[0], 1);
          result = _yield$Coonexion$exec33[0];
          if (!(result.length > 0)) {
            _context10.next = 10;
            break;
          }
          return _context10.abrupt("return", res.status(400).json(['El número de teléfono ya esta registrado']));
        case 10:
          res.status(200).json(['El número esta disponible']);
          _context10.next = 16;
          break;
        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json(['Error al buscar el télefono']);
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 13]]);
  }));
  return function SearchNumberPhoneRegister(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

//Alerta 
var AlertUser = exports.AlertUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var alertUser, ip, _yield$Coonexion$exec34, _yield$Coonexion$exec35, _yield$Coonexion$exec36, result, mensaje;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          alertUser = req.cookies.alertUser;
          ip = req.ip;
          _context11.next = 5;
          return _db.Coonexion.execute('CALL LoginCliente(?)', [alertUser]);
        case 5:
          _yield$Coonexion$exec34 = _context11.sent;
          _yield$Coonexion$exec35 = _slicedToArray(_yield$Coonexion$exec34, 1);
          _yield$Coonexion$exec36 = _slicedToArray(_yield$Coonexion$exec35[0], 1);
          result = _yield$Coonexion$exec36[0];
          mensaje = "usuario ".concat(result[0].correo, " ha intentado iniciar s\xE9sion repetitivamente");
          console.log(result[0].id_usuario);
          _context11.next = 13;
          return _db.Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [result[0].id_usuario, ip, mensaje]);
        case 13:
          _context11.next = 19;
          break;
        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          res.status(500).json(['Error al informar']);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 15]]);
  }));
  return function AlertUser(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

//Cerrar sesiones
var PostLogout = exports.PostLogout = function PostLogout(req, res) {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

/*
export const BlockUser = async(req, res) =>{
    const {nombre, pass} = req.body 
    try {
        const [user] = await Coonexion.query('CALL obtenerUsuarioNombre(?)', [nombre])
        
        await Coonexion.execute('CALL actualizarEstadoUsuario(?, ?)', [usuario_id, nuevo_estado]);
    } catch (error) {
        console.log(error)
    }
}
Obtener un solo cliente

export const GetClientesId = async (req,res)=>{
    try {
        const [result] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente=?',[req.params.id])
        if(result.length <= 0) return res.status(404).json({
            message: 'Dato no encontrado'
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

//Crear un usuario
export const PostClientes = async (req,res)=>{
    try {
        const {nombre, telefono, Pass} = req.body
        const [rows] = await Coonexion.query('INSERT INTO Clientes (nombre, telefono, Pass) VALUES (?,?,?)',[nombre, telefono, Pass])
        res.send({
            id: rows.insertId,
            nombre,
            telefono,
            Pass,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}  

//Eliminar usuario
export const DeleteClientes = async (req,res) =>{
    try {
        const [result] = await Coonexion.query('DELETE FROM clientes WHERE id_cliente = ?',[req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: "No eliminado"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


//Actualiza un cliente general
export const PutClientes = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre,telefono, Pass} = req.body
        const [result] = await Coonexion.query('UPDATE clientes SET nombre = ?, telefono = ?, Pass = ? WHERE id_cliente = ?',[nombre,telefono,Pass,id])
        
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "cliente no existente"
        })
        
        const [act] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]) 
        
        res.json(act[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

//Actualiza un cliente parcialmente
export const PatchClientes = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre,telefono, Pass} = req.body
        
        const [result] = await Coonexion.query('UPDATE clientes SET nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono), Pass = IFNULL(?, Pass) WHERE id_cliente = ?',[nombre,telefono,Pass,id])
        
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "cliente no existente"
        })
        
        const [act] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]) 
        
        res.json(act[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}*/