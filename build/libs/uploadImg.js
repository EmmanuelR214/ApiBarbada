"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subirImagen = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'src/img'); // Directorio donde quieres guardar la imagen
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

// Función para subir la imagen
var subirImagen = exports.subirImagen = upload.single('imagen');

// module.exports = subirImagen;