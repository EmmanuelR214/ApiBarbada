"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _usersRoutes = _interopRequireDefault(require("./routes/users.routes.js"));
var _saucersRoutes = _interopRequireDefault(require("./routes/saucers.routes.js"));
var _adminRoutes = _interopRequireDefault(require("./routes/admin.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
// const allowedOrigins = ['amdin.labarbada.store ', 'labarbada.store']

app.use((0, _cors["default"])({
  origin: allowedOrigins,
  credentials: true
}));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use("/api", _usersRoutes["default"]);
app.use('/api', _saucersRoutes["default"]);
app.use('/api', _adminRoutes["default"]);
app.get("/api", function (req, res) {
  res.send('Bienvenido a la Api');
});
app.get('/', function (req, res) {
  res.send('¡El API está en funcionamiento!');
});
app.use(function (req, res, next) {
  res.status(404).json({
    message: "ruta no encontrada"
  });
});
var _default = exports["default"] = app;
/*
    origin: 'http://localhost:5173',
    // origin: 'http://localhost:5174',
    //origin: 'https://la-barbada2.vercel.app',
*/