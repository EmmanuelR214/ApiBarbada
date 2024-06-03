"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _saucersControllers = require("../controllers/saucers.controllers.js");
var router = (0, _express.Router)();

//Traer menú
router.get('/menu', _saucersControllers.GetMenu);

//mostrar lista de platillos
router.get('/lista-platillos', _saucersControllers.MostrarPlatillosAdmin);

//Traer datos a actualizar
router.post('/platillo-actializar', _saucersControllers.TraerDatosPlatilloActualizar);

//*Detalle del producto
//Traer descripcion del platillo 
router.get('/descripcion-platillo/:descPro', _saucersControllers.DescripcionPlatillo);

//obtener precip del platillo 
router.post('/precio-platillo', _saucersControllers.ObtenerPrecio);

//Obtener detalles de platillo mediante precio
router.post('/detalle-x-precio', _saucersControllers.ObtenerDetallesXprecio);

//*Parte administrador

router.get('/datos-platillo', _saucersControllers.TraerDatosPlatillo);

//*Funciones del carrito
//Insertar platillo al carrito
router.post('/shoppingcar', _saucersControllers.InsertShoppinCar);

//traer el carrito
router.get('/get-shoppingCar/:idUser', _saucersControllers.GetShoppingCar);

//Eliminar del carrito
router["delete"]('/delete-shoppingcar/:id_car', _saucersControllers.DeleteCarrito);

//traer el carrito
//!Actualizar funciones y rutas
router.put('/update-shoppingcar', _saucersControllers.UpdateShoppingCar);

//insertar platillo
router.post('/new-platillo', _saucersControllers.InsertPlatillo);
router.post('/eliminarPlatillo', _saucersControllers.EliminarPlatillo);
var _default = exports["default"] = router; //TODO:
// router.get('/mate-categorias', TraerCategorias)
// router.post('/filtro-platillos', FiltroCategoria)
// router.post('/desc-platillo', DescPlat)
// router.post('/traer-ventas', TraerVentas)
/*
// //traer una categoria
// router.post('/categoria', GetCategoria)

// //busca un platiloo
// router.post('/platillo', getBuscarPlatillo)

// //Traer elementos de reservaciones
// router.get('/res', GetDataReservation)

// //traer carrito
// router.get('/carrito', GetCarrito)


// //mandar a carrito 
// router.post('/carrito',PostCarrito)

// //Eliminar producto de carrito
// router.delete('/carrito',DeleteCarrito)
*/