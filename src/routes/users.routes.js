import { Router } from "express";
import {PostClientes,LoginClient, PostLogout, PostDataUser, verifYToken, PostRegisterUID, CompareUs, BlockUser} from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

const router = Router()

router.get('/verify', verifYToken)

//crear un usuario
router.post('/register', validateSchema(registerSchema), PostClientes)

//crear un usuario Google, facebook
router.post('/registerFG',  PostRegisterUID)

//Comparacion de usuario
router.post('/compareUs', CompareUs)

//login
router.post('/login', LoginClient)

//Logout
router.post('/logout', PostLogout)

//Trae los datos del usuario
router.get('/dataUser',PostDataUser)

//Bloquear usuario
router.post('/block', BlockUser)

export default router

/*
//Traer un los clientes
router.get('/clientes/:id', GetClientesId)

//crear un nuevo cliente
router.post('/clientes', PostClientes)

//eliminar un cliente
router.delete('/clientes/:id', DeleteClientes)

//actualizar un cliente (actualiza todos los datos que recibe)
router.put('/clientes/:id', PutClientes)

//actualizar un cliente (actualiza parcialmente)
router.patch('/clientes/:id', PatchClientes)*/
