import { Router } from "express";
import {
  DeleteCarrito, 
  DescripcionPlatillo, 
  GetMenu, 
  GetShoppingCar, 
  InsertPlatillo, 
  InsertShoppinCar, 
  ObtenerDetallesXprecio, 
  ObtenerPrecio, 
  TraerDatosPlatillo, 
  UpdateShoppingCar
} from "../controllers/saucers.controllers.js";

const router = Router()


//Traer menú
router.get('/menu', GetMenu)

//*Detalle del producto
//Traer descripcion del platillo 
router.get('/descripcion-platillo/:descPro', DescripcionPlatillo)

//obtener precip del platillo 
router.post('/precio-platillo', ObtenerPrecio)

//Obtener detalles de platillo mediante precio
router.post('/detalle-x-precio',ObtenerDetallesXprecio)

//*Parte administrador

router.get('/datos-platillo', TraerDatosPlatillo)


//*Funciones del carrito
//Insertar platillo al carrito
router.post('/shoppingcar', InsertShoppinCar)

//traer el carrito
router.get('/get-shoppingCar/:idUser', GetShoppingCar)

//Eliminar del carrito
router.delete('/delete-shoppingcar/:id_car', DeleteCarrito)


//!Actualizar funciones y rutas
router.put('/update-shoppingcar', UpdateShoppingCar)

//insertar platillo
router.post('/new-platillo', InsertPlatillo)

export default router






//TODO:

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