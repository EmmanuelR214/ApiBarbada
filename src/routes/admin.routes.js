import { Router } from "express";
import { GetClientes } from "../controllers/admin.controllers.js";
import { authRequired } from "../middlewares/validateToke.js";

const router = Router()

//Traer tofos los clientes
router.post('/clientes', authRequired, GetClientes)


export default router