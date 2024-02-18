import { Router } from "express";
import { 
  GetMenu,
  GetCategoria,
  getBuscarPlatillo,
  GetDataReservation,
  GetCarrito,
  PostCarrito, 
  DeleteCarrito, 
  } from "../controllers/saucers.controllers.js";

const router = Router()

//Traer menú
router.get('/menu', GetMenu)

//traer una categoria
router.post('/categoria', GetCategoria)

//busca un platiloo
router.post('/platillo', getBuscarPlatillo)

//Traer elementos de reservaciones
router.get('/res', GetDataReservation)

//traer carrito
router.get('/carrito', GetCarrito)


//mandar a carrito 
router.post('/carrito',PostCarrito)

//Eliminar producto de carrito
router.delete('/carrito',DeleteCarrito)


export default router