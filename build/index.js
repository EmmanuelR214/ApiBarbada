"use strict";

var _app = _interopRequireDefault(require("./app"));
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_config.PORT, function () {
  console.log("Servidor corriendo en el puerto ".concat(_config.PORT));
});
_app["default"].get('/', function (req, res) {
  res.send('¡El API está en funcionamiento!');
});