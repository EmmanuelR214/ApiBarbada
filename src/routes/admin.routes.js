import { Router } from "express";
import { GetClientes, LoginAdmin } from "../controllers/admin.controllers.js";
import { authRequired } from "../middlewares/validateToke.js";

const router = Router()

//Traer tofos los clientes
router.post('/clientes', authRequired, GetClientes)

//Login Admin
router.post('/login-admin', LoginAdmin)


export default router