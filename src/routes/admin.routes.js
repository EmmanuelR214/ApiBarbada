import { Router } from "express";
import { GetClientes, GetPresentaciones, LoginAdmin } from "../controllers/admin.controllers.js";
import { authRequired } from "../middlewares/validateToke.js";

const router = Router()

//Traer tofos los clientes
router.post('/clientes', authRequired, GetClientes)

router.get('/presenta', GetPresentaciones)

//Login admin
router.get('/presenta', LoginAdmin)


export default router