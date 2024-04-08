import { Router } from "express";
import {DeleteCarrito, DescripcionPlatillo, GetMenu, GetShoppingCar, InsertPlatillo, InsertShoppinCar, ObtenerDetallesXprecio, ObtenerPrecio, UpdateShoppingCar} from "../controllers/saucers.controllers.js";

const router = Router()

//Traer menú
router.get('/menu', GetMenu)

//Traer descripcion del platillo 
router.get('/descripcion-platillo/:descPro', DescripcionPlatillo)

//obtener precip del platillo 
router.post('/precio-platillo', ObtenerPrecio)

//Obtener detalles de platillo mediante precio
router.post('/detalle-x-precio',ObtenerDetallesXprecio)

//insertar platillo
router.post('/new-platillo', InsertPlatillo)

//Insertar platillo al carrito
router.post('/shoppingcar', InsertShoppinCar)

//traer el carrito
router.get('/get-shoppingCar/:idUser', GetShoppingCar)

//Actualizar carrito
router.put('/update-shoppingcar', UpdateShoppingCar)

//Eliminar del carrito
router.delete('/delete-shoppingcar/:id_car', DeleteCarrito)


export default router

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