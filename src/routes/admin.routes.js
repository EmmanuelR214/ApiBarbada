import { Router } from "express";
import { verifYTokenAdmin, GetClientes, LoginAdmin, TraerReporteVentas } from "../controllers/admin.controllers.js";
import { authRequired } from "../middlewares/validateToke.js";

const router = Router()

//Comprobar Usuario
router.get('/verify-admin', verifYTokenAdmin)


//Traer tofos los clientes
router.post('/clientes', authRequired, GetClientes)

//Login Admin
router.post('/login-admin', LoginAdmin)

//Traer venta general
router.get('/ventageneral', TraerReporteVentas)


export default router


// //Traer datos 
// router.get('/datos', DataForNewPlatillo)