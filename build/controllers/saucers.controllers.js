"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateShoppingCar = exports.TraerDatosPlatillo = exports.ObtenerPrecio = exports.ObtenerDetallesXprecio = exports.MostrarPlatillosAdmin = exports.InsertShoppinCar = exports.InsertPlatillo = exports.GetShoppingCar = exports.GetMenu = exports.DescripcionPlatillo = exports.DeleteCarrito = void 0;
var _db = require("../db.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//traer todos  los platillos
var GetMenu = exports.GetMenu = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, categoria, platillo, query, _yield$Coonexion$exec, _yield$Coonexion$exec2, _yield$Coonexion$exec3, result, _yield$Coonexion$exec4, _yield$Coonexion$exec5, _yield$Coonexion$exec6, category;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, categoria = _req$body.categoria, platillo = _req$body.platillo;
          query = 'CALL ObtenerMenu()'; // if(categoria) query = ''
          _context.next = 5;
          return _db.Coonexion.execute('CALL ObtenerMenu()');
        case 5:
          _yield$Coonexion$exec = _context.sent;
          _yield$Coonexion$exec2 = _slicedToArray(_yield$Coonexion$exec, 1);
          _yield$Coonexion$exec3 = _slicedToArray(_yield$Coonexion$exec2[0], 1);
          result = _yield$Coonexion$exec3[0];
          _context.next = 11;
          return _db.Coonexion.execute('CALL ObtenerCategorias()');
        case 11:
          _yield$Coonexion$exec4 = _context.sent;
          _yield$Coonexion$exec5 = _slicedToArray(_yield$Coonexion$exec4, 1);
          _yield$Coonexion$exec6 = _slicedToArray(_yield$Coonexion$exec5[0], 1);
          category = _yield$Coonexion$exec6[0];
          console.log(result);
          res.json([result, category]);
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json(['Error al traer el Menú']);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function GetMenu(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/*
export const getMenu = async (req, res) => {
  try {
    const { categoria, nombreProducto } = req.query;
    let query = 'CALL ObtenerMenu()';

    // Si se especifica una categoría, modificar la consulta
    if (categoria) {
      query = `CALL ObtenerProductosPorCategoria('${categoria}')`;
    }

    // Si se especifica un nombre de producto, modificar la consulta
    if (nombreProducto) {
      query = `CALL BuscarProductoPorNombre('${nombreProducto}')`;
    }

    const [[result]] = await Coonexion.execute(query);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(['Error al obtener el menú']);
  }
};
*/

var DescripcionPlatillo = exports.DescripcionPlatillo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var descPro, _yield$Coonexion$exec7, _yield$Coonexion$exec8, _yield$Coonexion$exec9, result, _yield$Coonexion$exec10, _yield$Coonexion$exec11, _yield$Coonexion$exec12, result2;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          descPro = req.params.descPro;
          _context2.next = 4;
          return _db.Coonexion.execute('CALL ObtenerDetallePlatillo(?)', [descPro]);
        case 4:
          _yield$Coonexion$exec7 = _context2.sent;
          _yield$Coonexion$exec8 = _slicedToArray(_yield$Coonexion$exec7, 1);
          _yield$Coonexion$exec9 = _slicedToArray(_yield$Coonexion$exec8[0], 1);
          result = _yield$Coonexion$exec9[0];
          if (!result[0]) res.status(400).json(['No se pudo obtener el platillo']);
          _context2.next = 11;
          return _db.Coonexion.execute('CALL ObtenerRecomendaciones(?)', [descPro]);
        case 11:
          _yield$Coonexion$exec10 = _context2.sent;
          _yield$Coonexion$exec11 = _slicedToArray(_yield$Coonexion$exec10, 1);
          _yield$Coonexion$exec12 = _slicedToArray(_yield$Coonexion$exec11[0], 1);
          result2 = _yield$Coonexion$exec12[0];
          console.log([result[0], result2]);
          if (!result2[0]) res.status(400).json(['No se pudo obtener las recomendaciones']);
          res.status(200).json([result[0], result2]);
          _context2.next = 24;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json(['error al obtener el detalle del platillo']);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function DescripcionPlatillo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var ObtenerPrecio = exports.ObtenerPrecio = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, id, tam, pre, _yield$Coonexion$exec13, _yield$Coonexion$exec14, _yield$Coonexion$exec15, precio;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, id = _req$body2.id, tam = _req$body2.tam, pre = _req$body2.pre;
          _context3.next = 4;
          return _db.Coonexion.execute('CALL ObtenerPrecioPlatillo(?,?,?)', [id, pre, tam]);
        case 4:
          _yield$Coonexion$exec13 = _context3.sent;
          _yield$Coonexion$exec14 = _slicedToArray(_yield$Coonexion$exec13, 1);
          _yield$Coonexion$exec15 = _slicedToArray(_yield$Coonexion$exec14[0], 1);
          precio = _yield$Coonexion$exec15[0];
          if (precio[0]) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(400).json(['No se pudo obtener el precio']));
        case 10:
          res.status(200).json([precio[0]]);
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json(['error al obtener el precio']);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function ObtenerPrecio(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var ObtenerDetallesXprecio = exports.ObtenerDetallesXprecio = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, id, pre, _yield$Coonexion$exec16, _yield$Coonexion$exec17, _yield$Coonexion$exec18, precio;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, id = _req$body3.id, pre = _req$body3.pre;
          _context4.next = 4;
          return _db.Coonexion.execute('CALL ObtenerDetallePlatilloPrecio(?,?)', [id, pre]);
        case 4:
          _yield$Coonexion$exec16 = _context4.sent;
          _yield$Coonexion$exec17 = _slicedToArray(_yield$Coonexion$exec16, 1);
          _yield$Coonexion$exec18 = _slicedToArray(_yield$Coonexion$exec17[0], 1);
          precio = _yield$Coonexion$exec18[0];
          if (precio[0]) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(400).json(['No se pudo obtener el precio']));
        case 10:
          res.status(200).json([precio[0]]);
          _context4.next = 17;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json(['error al obtener el precio']);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function ObtenerDetallesXprecio(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//TODO: Carrito
var InsertShoppinCar = exports.InsertShoppinCar = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body4, id_platillo, id_usuario, cantidad, total, _yield$Coonexion$exec19, _yield$Coonexion$exec20, _yield$Coonexion$exec21, searchPlatillo, id_car, cant, canti, sub, tot, _yield$Coonexion$exec22, _yield$Coonexion$exec23, result, _yield$Coonexion$exec24, _yield$Coonexion$exec25, _result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body4 = req.body, id_platillo = _req$body4.id_platillo, id_usuario = _req$body4.id_usuario, cantidad = _req$body4.cantidad, total = _req$body4.total;
          console.log(id_platillo, id_usuario, cantidad, total);
          _context5.next = 5;
          return _db.Coonexion.execute('CALL ObtenerCarrito(?)', [id_platillo]);
        case 5:
          _yield$Coonexion$exec19 = _context5.sent;
          _yield$Coonexion$exec20 = _slicedToArray(_yield$Coonexion$exec19, 1);
          _yield$Coonexion$exec21 = _slicedToArray(_yield$Coonexion$exec20[0], 1);
          searchPlatillo = _yield$Coonexion$exec21[0];
          console.log(searchPlatillo, 'juan');
          if (!(searchPlatillo.length > 0)) {
            _context5.next = 27;
            break;
          }
          console.log(searchPlatillo, 1);
          id_car = searchPlatillo[0].id_carrito;
          cant = searchPlatillo[0].cantidad;
          canti = cant + cantidad;
          sub = parseFloat(searchPlatillo[0].subtotal);
          tot = sub + total;
          _context5.next = 19;
          return _db.Coonexion.execute('CALL ActualizarCarrito(?,?,?)', [id_car, canti, tot]);
        case 19:
          _yield$Coonexion$exec22 = _context5.sent;
          _yield$Coonexion$exec23 = _slicedToArray(_yield$Coonexion$exec22, 1);
          result = _yield$Coonexion$exec23[0];
          if (!(result.affectedRows === 0)) {
            _context5.next = 24;
            break;
          }
          return _context5.abrupt("return", res.status(400).json(['Ocurrio un error al agregar al carrito']));
        case 24:
          res.status(200).json(['Se ha agregado al carrito']);
          _context5.next = 35;
          break;
        case 27:
          _context5.next = 29;
          return _db.Coonexion.execute('CALL InsertarCarrito(?,?,?,?)', [id_platillo, id_usuario, cantidad, total]);
        case 29:
          _yield$Coonexion$exec24 = _context5.sent;
          _yield$Coonexion$exec25 = _slicedToArray(_yield$Coonexion$exec24, 1);
          _result = _yield$Coonexion$exec25[0];
          if (!(_result.affectedRows === 0)) {
            _context5.next = 34;
            break;
          }
          return _context5.abrupt("return", res.status(400).json(['Ocurrio un error al agregar al carrito']));
        case 34:
          res.status(200).json(['Se ha agregado al carrito']);
        case 35:
          _context5.next = 41;
          break;
        case 37:
          _context5.prev = 37;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json(['Error al agregar al carrito']);
        case 41:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 37]]);
  }));
  return function InsertShoppinCar(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var GetShoppingCar = exports.GetShoppingCar = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, _yield$Coonexion$exec26, _yield$Coonexion$exec27, _yield$Coonexion$exec28, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.idUser;
          _context6.next = 4;
          return _db.Coonexion.execute('CALL ObtenerCarrito(?)', [id]);
        case 4:
          _yield$Coonexion$exec26 = _context6.sent;
          _yield$Coonexion$exec27 = _slicedToArray(_yield$Coonexion$exec26, 1);
          _yield$Coonexion$exec28 = _slicedToArray(_yield$Coonexion$exec27[0], 1);
          result = _yield$Coonexion$exec28[0];
          console.log(result);
          res.status(200).json([result]);
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json(['Error al traer el carrito']);
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function GetShoppingCar(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var DeleteCarrito = exports.DeleteCarrito = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id_carrito, _yield$Coonexion$exec29, _yield$Coonexion$exec30, delet;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id_carrito = req.params.id_car;
          _context7.next = 4;
          return _db.Coonexion.execute('CALL EliminarItemCarrito(?)', [id_carrito]);
        case 4:
          _yield$Coonexion$exec29 = _context7.sent;
          _yield$Coonexion$exec30 = _slicedToArray(_yield$Coonexion$exec29, 1);
          delet = _yield$Coonexion$exec30[0];
          if (!(delet.affectedRows === 0)) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(400).json(['Ocurrio un error al eliminar del carrito']));
        case 9:
          res.status(200).json(['Se elimino del carrito']);
          _context7.next = 16;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).json(['Error al eliminar el carrito']);
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function DeleteCarrito(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//! Actualizar
var UpdateShoppingCar = exports.UpdateShoppingCar = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body5, id_carrito, cantidad, subtotal, _yield$Coonexion$exec31, _yield$Coonexion$exec32, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body5 = req.body, id_carrito = _req$body5.id_carrito, cantidad = _req$body5.cantidad, subtotal = _req$body5.subtotal;
          if (!(cantidad < 1)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json(['No se actualizo la cantidad']));
        case 4:
          _context8.next = 6;
          return _db.Coonexion.execute('CALL ActualizarCarrito(?,?,?)', [id_carrito, cantidad, subtotal]);
        case 6:
          _yield$Coonexion$exec31 = _context8.sent;
          _yield$Coonexion$exec32 = _slicedToArray(_yield$Coonexion$exec31, 1);
          result = _yield$Coonexion$exec32[0];
          if (!(result.affectedRows === 0)) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(400).json(['Ocurrio un error al agregar al carrito']));
        case 11:
          res.status(200).json(['Se actualizo la cantidad']);
          _context8.next = 18;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).json(['Error al actualizar el carrito']);
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function UpdateShoppingCar(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//TODO: PARTEDE ADMIN

var TraerDatosPlatillo = exports.TraerDatosPlatillo = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _yield$Coonexion$exec33, _yield$Coonexion$exec34, _yield$Coonexion$exec35, Tamaños, _yield$Coonexion$exec36, _yield$Coonexion$exec37, _yield$Coonexion$exec38, Categorias, _yield$Coonexion$exec39, _yield$Coonexion$exec40, _yield$Coonexion$exec41, Presentaciones, _yield$Coonexion$exec42, _yield$Coonexion$exec43, _yield$Coonexion$exec44, Platillos, _yield$Coonexion$exec45, _yield$Coonexion$exec46, _yield$Coonexion$exec47, Guarniciones;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _db.Coonexion.execute('CALL ObtenerTamaños()');
        case 3:
          _yield$Coonexion$exec33 = _context9.sent;
          _yield$Coonexion$exec34 = _slicedToArray(_yield$Coonexion$exec33, 1);
          _yield$Coonexion$exec35 = _slicedToArray(_yield$Coonexion$exec34[0], 1);
          Tamaños = _yield$Coonexion$exec35[0];
          _context9.next = 9;
          return _db.Coonexion.execute('CALL ObtenerCategorias()');
        case 9:
          _yield$Coonexion$exec36 = _context9.sent;
          _yield$Coonexion$exec37 = _slicedToArray(_yield$Coonexion$exec36, 1);
          _yield$Coonexion$exec38 = _slicedToArray(_yield$Coonexion$exec37[0], 1);
          Categorias = _yield$Coonexion$exec38[0];
          _context9.next = 15;
          return _db.Coonexion.execute('CALL ObtenerPresentaciones()');
        case 15:
          _yield$Coonexion$exec39 = _context9.sent;
          _yield$Coonexion$exec40 = _slicedToArray(_yield$Coonexion$exec39, 1);
          _yield$Coonexion$exec41 = _slicedToArray(_yield$Coonexion$exec40[0], 1);
          Presentaciones = _yield$Coonexion$exec41[0];
          _context9.next = 21;
          return _db.Coonexion.execute('CALL ObtenerPlatillosRecomendacion()');
        case 21:
          _yield$Coonexion$exec42 = _context9.sent;
          _yield$Coonexion$exec43 = _slicedToArray(_yield$Coonexion$exec42, 1);
          _yield$Coonexion$exec44 = _slicedToArray(_yield$Coonexion$exec43[0], 1);
          Platillos = _yield$Coonexion$exec44[0];
          _context9.next = 27;
          return _db.Coonexion.execute('CALL ObtenerGuarniciones()');
        case 27:
          _yield$Coonexion$exec45 = _context9.sent;
          _yield$Coonexion$exec46 = _slicedToArray(_yield$Coonexion$exec45, 1);
          _yield$Coonexion$exec47 = _slicedToArray(_yield$Coonexion$exec46[0], 1);
          Guarniciones = _yield$Coonexion$exec47[0];
          res.status(200).json([Tamaños, Categorias, Presentaciones, Platillos, Guarniciones]);
          _context9.next = 38;
          break;
        case 34:
          _context9.prev = 34;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).json(['Error al traer los datos del platillos']);
        case 38:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 34]]);
  }));
  return function TraerDatosPlatillo(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var InsertPlatillo = exports.InsertPlatillo = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body6, platillo, descripcion, categoria, imagen, combinaciones, extras, guarniciones, _yield$Coonexion$exec48, _yield$Coonexion$exec49, result, nuevoIdPlatillo, _iterator, _step, combinacion, tamaño, presentacion, valor, idTamaño, idPresentacion, precioAdicional, _iterator2, _step2, extra, value, label, precio, idPlatilloRecomendado, tipo, _iterator3, _step3, guarnicion, _value, _label, _precio, _idPlatilloRecomendado, _tipo;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body6 = req.body, platillo = _req$body6.platillo, descripcion = _req$body6.descripcion, categoria = _req$body6.categoria, imagen = _req$body6.imagen, combinaciones = _req$body6.combinaciones, extras = _req$body6.extras, guarniciones = _req$body6.guarniciones; // Insertar el nuevo platillo en la tabla de platillos
          _context10.next = 4;
          return _db.Coonexion.execute('INSERT INTO platillos (nombre, descripcion, imagen, id_estadoPlatillo, id_categoria, id_sucursal, platillo_disponible) VALUES (?, ?, ?, ?, ?, ?, ?)', [platillo, descripcion, imagen, 3, categoria, 1, true]);
        case 4:
          _yield$Coonexion$exec48 = _context10.sent;
          _yield$Coonexion$exec49 = _slicedToArray(_yield$Coonexion$exec48, 1);
          result = _yield$Coonexion$exec49[0];
          nuevoIdPlatillo = result.insertId; // Insertar las combinaciones de presentaciones y tamaños en la tabla de relacion_presentacion_tamaño
          _iterator = _createForOfIteratorHelper(combinaciones);
          _context10.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context10.next = 21;
            break;
          }
          combinacion = _step.value;
          tamaño = combinacion.tamaño, presentacion = combinacion.presentacion, valor = combinacion.valor;
          idTamaño = tamaño.value;
          idPresentacion = presentacion.value;
          precioAdicional = valor;
          _context10.next = 19;
          return _db.Coonexion.execute('INSERT INTO relacion_presentacion_tamaño (id_platillo, id_presentacion, id_tamaño, precio_adicional) VALUES (?, ?, ?, ?)', [nuevoIdPlatillo, idPresentacion, idTamaño, precioAdicional]);
        case 19:
          _context10.next = 11;
          break;
        case 21:
          _context10.next = 26;
          break;
        case 23:
          _context10.prev = 23;
          _context10.t0 = _context10["catch"](9);
          _iterator.e(_context10.t0);
        case 26:
          _context10.prev = 26;
          _iterator.f();
          return _context10.finish(26);
        case 29:
          // Insertar las recomendaciones en la tabla de recomendaciones
          _iterator2 = _createForOfIteratorHelper(extras);
          _context10.prev = 30;
          _iterator2.s();
        case 32:
          if ((_step2 = _iterator2.n()).done) {
            _context10.next = 41;
            break;
          }
          extra = _step2.value;
          value = extra.value, label = extra.label, precio = extra.precio;
          idPlatilloRecomendado = value;
          tipo = 'acompañamiento';
          _context10.next = 39;
          return _db.Coonexion.execute('INSERT INTO recomendaciones (id_platillo_principal, id_platillo_recomendado, tipo) VALUES (?, ?, ?)', [nuevoIdPlatillo, idPlatilloRecomendado, tipo]);
        case 39:
          _context10.next = 32;
          break;
        case 41:
          _context10.next = 46;
          break;
        case 43:
          _context10.prev = 43;
          _context10.t1 = _context10["catch"](30);
          _iterator2.e(_context10.t1);
        case 46:
          _context10.prev = 46;
          _iterator2.f();
          return _context10.finish(46);
        case 49:
          _iterator3 = _createForOfIteratorHelper(guarniciones);
          _context10.prev = 50;
          _iterator3.s();
        case 52:
          if ((_step3 = _iterator3.n()).done) {
            _context10.next = 61;
            break;
          }
          guarnicion = _step3.value;
          _value = guarnicion.value, _label = guarnicion.label, _precio = guarnicion.precio;
          _idPlatilloRecomendado = _value;
          _tipo = 'guarnicion';
          _context10.next = 59;
          return _db.Coonexion.execute('INSERT INTO recomendaciones (id_platillo_principal, id_platillo_recomendado, tipo) VALUES (?, ?, ?)', [nuevoIdPlatillo, _idPlatilloRecomendado, _tipo]);
        case 59:
          _context10.next = 52;
          break;
        case 61:
          _context10.next = 66;
          break;
        case 63:
          _context10.prev = 63;
          _context10.t2 = _context10["catch"](50);
          _iterator3.e(_context10.t2);
        case 66:
          _context10.prev = 66;
          _iterator3.f();
          return _context10.finish(66);
        case 69:
          res.status(200).json({
            message: 'Platillo insertado exitosamente.'
          });
          _context10.next = 76;
          break;
        case 72:
          _context10.prev = 72;
          _context10.t3 = _context10["catch"](0);
          console.log(_context10.t3);
          res.status(500).json({
            error: 'Error al insertar un platillo.'
          });
        case 76:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 72], [9, 23, 26, 29], [30, 43, 46, 49], [50, 63, 66, 69]]);
  }));
  return function InsertPlatillo(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var MostrarPlatillosAdmin = exports.MostrarPlatillosAdmin = function MostrarPlatillosAdmin(req, res) {
  try {} catch (error) {
    res.status(500).json(['Error al traer los platillos']);
  }
};

//TODO:
// export const TraerCategorias = async(req, res) => {
//   try {
//     const [result] = await Coonexion.execute('SELECT DISTINCT c.id_categoria, c.nombreCategoria FROM categorias c JOIN platillos p ON c.id_categoria = p.id_categoria JOIN relacion_presentacion_tamaño rpt ON p.id_platillo = rpt.id_platillo')
//     res.status(200).json([result])
//   } catch (error) {
//     res.status(500).json(['Error al traer las categorias'])
//   }
// }

// export const FiltroCategoria = async(req, res) =>{
//   try {
//     const {id} = req.body
//     const [result] = await Coonexion.execute('SELECT DISTINCT p.* FROM relacion_presentacion_tamaño rpt JOIN platillos p ON rpt.id_platillo = p.id_platillo WHERE p.id_categoria = ?',[id])
//     res.status(200).json([result])
//   } catch (error) {
//     res.status(500).json(['Error al traer los platillos'])
//   }
// }

// export const DescPlat = async(req, res) =>{
//   try {
//     const {id} = req.body
//     const [res2] = await Coonexion.execute('SELECT DISTINCT rp.id_relacion, rp.id_presentacion, pr.nombrePresentacion, rp.id_tamaño, tp.tamaño FROM relacion_presentacion_tamaño rp JOIN presentaciones pr ON rp.id_presentacion = pr.id_presentacion JOIN tamaño_platillo tp ON rp.id_tamaño = tp.id_tamaño WHERE rp.id_platillo = ?',[id])
//     res.status(200).json([res2])
//   } catch (error) {
//     res.status(500).json(['Error al traer los platillos'])
//   }
// }

// export const TraerVentas = async (req, res) => {
//   try {
//     const { mes, platillo } = req.body;
//     const [result] = await Coonexion.execute('SELECT * FROM ventas v INNER JOIN descripcion_ventas dv ON v.id_venta = dv.id_venta WHERE MONTH(v.fecha_venta) = ? AND YEAR(v.fecha_venta) = 2024 AND dv.id_relacion = ?', [mes, platillo]);

//     const totalVentas = result.length; 

//     console.log(result);
//     console.log(totalVentas);
//     res.status(200).json([totalVentas]);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error al traer las ventas del mes' });
//   }
// };

/*//Buscar un solo producto
export const getBuscarPlatillo = async (req,res) =>{
  const {nombre} = req.body
  try {
    const [result] = await Coonexion.execute(`
      SELECT
      RP.id_relacion,
      P.nombre AS platillo_nombre,
      P.descripcion AS platillo_descripcion,
      P.imagen AS platillo_imagen,
      PP.nombre AS presentacion_nombre,
      RP.precio_adicional
    FROM
      Relacion_Presentacion_Platillo RP
    JOIN
      Platillos P ON RP.id_platillo = P.id_platillo
    JOIN
      Presentaciones PP ON RP.id_presentacion = PP.id_presentacion
    WHERE
    P.nombre = ?
    `, [nombre])
    res.json(result);
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).send('Error interno del servidor')
  }
}


//filtrar por categorias
export const GetCategoria = async (req, res) => {
  const {categoria} = req.body
  try {
    const [result] = await Coonexion.execute(`
      SELECT
      RP.id_relacion,
      P.nombre AS platillo_nombre,
      P.descripcion AS platillo_descripcion,
      P.imagen AS platillo_imagen,
      PP.nombre AS presentacion_nombre,
      RP.precio_adicional
    FROM
      Relacion_Presentacion_Platillo RP
    JOIN
      Platillos P ON RP.id_platillo = P.id_platillo
    JOIN
      Presentaciones PP ON RP.id_presentacion = PP.id_presentacion
    WHERE
    P.id_categoria = ?
    `, [categoria])
    res.json(result);
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).send('Error interno del servidor')
  }
}

//Muestra los elementos de reservaciones
export const GetDataReservation = async(req,res) =>{
  try {
    const [mesas] = await Coonexion.query('SELECT * FROM mesas')
    const [typeR] = await Coonexion.query('SELECT * FROM tiposreservacion')
    const [areas] = await Coonexion.query('SELECT * FROM areas')
    const result = {mesas, typeR, areas}
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      message:"Ocurrio un error"
  })
  }
}

//Visualiza los platillos agregados al carrito
export const GetCarrito = async (req,res) =>{
  try {
    //
  } catch (error) {
    //
  }
}


// Agregar platilos a un carrito
export const PostCarrito = async (req, res) =>{
  try {
    //
  } catch (error) {
    //
  }
}


//Eliminar producto del carrito
export const DeleteCarrito = async (req,res) =>{
  try {
    //
  } catch (error) {
    //
  }
}*/