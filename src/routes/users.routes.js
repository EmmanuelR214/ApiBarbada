import { Router } from "express";
import {verifYToken, PostLogout, SearchNumberPhoneRegister, RegisterUser, LoginUser, RegisterFirebase, sendEmail, RecoverPasswordEmail, AlertUser, TraerDireccionUser, InsertarDireccion, BuscarCorreo} from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";
import { CrearVenta } from "../controllers/saucers.controllers.js";

const router = Router()
//Comprobar si existe un token
router.get('/verify', verifYToken)

//Alerta a usuario
router.get('/alertloging', AlertUser)

//traer direccion usuario
router.get('/direcciones/:idUser', TraerDireccionUser)

//Insertar dioreccion
router.post('/insertarDireccion', InsertarDireccion)


//CREAR VENTA
router.post('/venta', CrearVenta)



//Registro-Login Firbase
router.post('/facegoo',RegisterFirebase)

//Login user
router.post('/login',LoginUser)

//Registrar usuario
router.post('/register',RegisterUser)

//Buscar ciente por telefono
router.post('/searchPhone',SearchNumberPhoneRegister)

//Enviar codigo
router.post('/sendCodeEmail', sendEmail)

//Actualizar contraseña por correo
router.post('/recoverPass',RecoverPasswordEmail)

//cerrar sesiones
router.post('/logout',PostLogout)

//Buscar correo
router.post('/correo', BuscarCorreo)

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
