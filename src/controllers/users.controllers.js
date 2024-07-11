//Conextion
import { Coonexion } from "../db.js"

//Dependencias
import {v4 as uuidv4} from 'uuid'

//Configuraciones
import bcrypt from 'bcrypt';
import { CreateAccessToken } from "../libs/jwt.js";
import { verifyMail } from "../middlewares/authMail.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


//Encriptar datos
const hashData = async (data) => {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const Encrypt = await bcrypt.hash(data, salt)
        return Encrypt
    } catch (error) {
        console.error('Error encriptar datos:', error)
        throw error 
    }
}

//Comparar datos encriptados
const compareData = async (data, hash) => {
    return await bcrypt.compare(data, hash)
}

export const verifYToken = async(req, res) =>{
    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json(['Unauthorized'])
            jwt.verify(token, TOKEN_SECRET, async (err, user) => {
                if(err) return res.status(401).json(['Unauthorized'])
            
            const [userFound] = await Coonexion.query('CALL obtenerUsuarioID(?)', [user.id])
            
            if(!userFound[0]) return res.status(401).json(['Unauthorized'])
            
            const [[dataUser]] = userFound
            console.log(dataUser)
            return res.json({
                id: dataUser.id_usuario,
                rol: dataUser.roles
                // nombre: dataUser.nombre,
                // telefono: dataUser.telefono
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error del servidor'])
    }
}

//Actualiza contraseña por correo
export const RecoverPasswordEmail = async(req, res) => {
    try {
        const {email, password, id} = req.body
        const ip = req.ip
        const pass = await hashData(password)
        console.log('chi')
        const [update] = await Coonexion.execute('CALL ActualizarPassword(?,?,?,?)',[pass, email, id, ip])
        
        if(update.affectedRows <= 0) return res.status(400).json(['No se pudo actualizar la contraseña'])
        
        const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [email])
        
        if(result.length > 0){
            const token = await CreateAccessToken({id: result[0].id_usuario})
            res.cookie('token', token)
            res.status(200).json([result[0]])
        }else{
            res.status(200).json(['si'])
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al actualizar la contraseña'])
    }
}


//Enviar email de verificación
export const sendEmail = async(req, res) =>{
    try {
        const {mail} = req.body
        
        const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[mail])
        
        if(!result[0]) return res.status(400).json(['El correo no esta registrado'])
        
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigoSecreto = '';
        for (let i = 0; i < 6; i++) {
            codigoSecreto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        
        await verifyMail(mail, codigoSecreto);
        
        res.status(200).json([codigoSecreto, result[0].id_usuario])
    } catch (error) {
        res.status(500).json(['Error al enviar el código'])
    }
} 

//Login de facebook y google
export const RegisterFirebase = async (req, res) =>{
    try {   
        const {uid, correo, telefono, message } =  req.body
        const ip = req.ip
        const tel = telefono ? telefono : ''
        const rol = 1
        const estado = 1
        const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioID(?)',[uid])
        if(result.length > 0){
            let mensaje = `El usuario ${correo} inicio sésion con ${message}`
            await Coonexion.execute('RegistroBitacoraUsuario(?,?,?)', [uid, ip, mensaje ])
            const token = await CreateAccessToken({id: uid})
            res.cookie('token', token)
            res.status(200).json([result[0], 'login'])
            return
        }else{
            
            const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[correo])
            if (repeaterMail.length > 0) return res.status(400).json(['El correo ya está en uso'])
            
            let mensaje = `Nuevo usuario registrado con ${message}`
            const pass = await  hashData(uid)
            await Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)',[uid, correo, tel, pass, estado, rol, ip, mensaje])
            const [[lookUser]] = await Coonexion.execute('CALL ObtenerUsuarioID(?)', [uid])
            const token = await CreateAccessToken({id: uid})
            res.cookie('token', token)
            res.status(200).json([lookUser, 'register'])
        }
    } catch (error) {
        console.error('Error al buscar usuario en la base de datos', error)
        res.status(500).json(['Error interno del servidor'])
    }
}

//login usuarios
export const LoginUser = async(req, res) => {
    try {
        const {param, password} = req.body
        const ip = req.ip
        
        const [[result]] = await Coonexion.execute('CALL LoginCliente(?)',[param])
        
        if(!result[0]) return res.status(400).json(['El usuario no existe'])
        
        const user = result[0]
        const PasswordValid = await compareData(password, user.passwordUs)
        
        if (!PasswordValid) return res.status(400).json( ["Contraseña incorrecta"] )
        
        const [[bitacora]] = await Coonexion.execute('CALL ObtenerBitacoraUsuario(?)',[user.id_usuario])
        
        const mensaje = ip === bitacora[0].direccion_ip ? `El usuario ${user.correo} inició sesión desde la misma plataforma` : `El usuario ${user.correo} inició sesión desde otro dispositivo`;
        
        await Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [user.id_usuario, ip, mensaje ])
        
        const token = await CreateAccessToken({id: user.id_usuario})
        // const oneDayInSeconds = 24 * 60 * 60;
        // const cookieOptions = {
        //     maxAge: oneDayInSeconds * 1000, // Convertir segundos a milisegundos
        //     httpOnly: true,
        //     // Puedes agregar otras opciones como 'secure' si tu aplicación es HTTPS
        // };
        res.cookie('token', token, {})
        // ,{ maxAge: 86400000, httpOnly: true, sameSite: 'none', secure: true, httpOnly: false}
        res.json({
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al intentar iniciar sesion'])
    }
}

//Registrar usuario nuevo
export const RegisterUser = async(req, res) =>{
    try {
        const {uid, correo, telefono, password} = req.body
        const ip = req.ip
        const rol = 1
        const estado = 1
        const newId = uid ? uid : uuidv4()
        let mensaje = `Nuevo usuario registrado`
        
        const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[correo])
        if (repeaterMail.length > 0) return res.status(400).json(['El correo ya está en uso'])
        
        const pass = await hashData(password)
        await Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)',[newId, correo, telefono, pass, estado, rol, ip, mensaje])
        
        const [[[dataUser]]] = await Coonexion.execute('CALL obtenerUsuarioID(?)',[newId])
        
        const token = await CreateAccessToken({ id: newId })
        res.cookie('token', token)
        res.json({
            dataUser
        })
    } catch (error) {
        res.status(500).json(['Error al crear usuario'])
    }
}

//Buscar usuario por numero de telefono
export const SearchNumberPhoneRegister = async(req, res) =>{
    try {
        const {telefono} = req.body
        
        const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioTelefono(?)',[telefono])
        if(result.length > 0) return res.status(400).json(['El número de teléfono ya esta registrado'])
        res.status(200).json(['El número esta disponible'])
    } catch (error) {
        res.status(500).json(['Error al buscar el télefono'])
    }
}

//Alerta 
export const AlertUser = async(req, res) =>{
    try {
        const {alertUser} = req.cookies
        const ip = req.ip
        
        const [[result]] = await Coonexion.execute('CALL LoginCliente(?)', [alertUser])
        
        let mensaje = `usuario ${result[0].correo} ha intentado iniciar sésion repetitivamente`
        console.log(result[0].id_usuario) 
        await Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [result[0].id_usuario, ip, mensaje ])
        
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al informar'])
    }
}

//Cerrar sesiones
export const PostLogout = (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const TraerDireccionUser = async(req, res) =>{
    try {
        const id = req.params.idUser
        const [[result]] = await Coonexion.execute('CALL ObtenerDirecciones(?)', [id])
        const [result2] = await Coonexion.execute('SELECT ad.id_apodo, ad.apodo_direccion, i.url_icono FROM apodos_direcciones ad INNER JOIN iconos i ON ad.id_icono = i.id_icono')
        res.status(200).json([result, result2])
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al traer direcciones'])
    }
}

export const InsertarDireccion = async(req, res) => {
    try {
        const {direccion, descripcion, id_usuario, id_apodo } = req.body
        await Coonexion.execute('CALL InsertarDireccion(?, ?, ?, ?)', [direccion, descripcion, id_usuario, id_apodo])
        res.status(200).json(['Dirección agregada'])
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al insertar la dirección'])
    }
}

export const BuscarCorreo = async (req, res) => {
    try {
        const { correo } = req.body;
        const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [correo]);
        
        const response = repeaterMail.length > 0 ? ['Si'] : ['No'];
        const status = repeaterMail.length > 0 ? 200 : 404;
        
        return res.status(status).json(response);    
    }catch (error) {
        console.error('Error al buscar correo:', error.message);
        res.status(500).json(['Error al buscar']); 
    }
}

export const InsertarVentaSkill = async (req, res) => {
    try {
        const { correo, platillo } = req.body;
        const fechaActual = new Date();
        const estado = 'Pendiente';
        let total = 0; // Inicializamos total como 0
        const metodoPago = 'Efectivo';
        
        // Obtener el ID de usuario
        const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [correo]);
        const id_usuario = repeaterMail[0].id_usuario;
        
        // Obtener la dirección del usuario
        const [direccion] = await Coonexion.execute('SELECT * FROM direcciones WHERE id_usuario = ?', [id_usuario]);
        const id_direccion = direccion[0].id_direccion;
        
        // Obtener información del platillo
        const [platilloOrdenado] = await Coonexion.execute('SELECT * FROM platillos WHERE nombre = ?', [platillo]);
        if (!platilloOrdenado || platilloOrdenado.length === 0) {
            return res.status(404).json(['El platillo no fue encontrado']);
        }
        
        const id_platillo = platilloOrdenado[0].id_platillo;
        
        // Obtener la relación de presentación y tamaño del platillo
        const [relacion] = await Coonexion.execute('SELECT * FROM relacion_presentacion_tamaño WHERE id_platillo = ?', [id_platillo]);
        if (!relacion || relacion.length === 0) {
            return res.status(404).json(['No se encontró la relación de presentación y tamaño del platillo']);
        }
        const id_relacion = relacion[0].id_relacion;
        
        // Insertar en la tabla de ventas
        const [ventaResult] = await Coonexion.execute('INSERT INTO ventas (id_usuario, total, estado_pedido, fecha_venta, id_direccion, id_metodo_pago, monto_pagado, cambio_devuelto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_usuario, total, estado, fechaActual, id_direccion, metodoPago, 0, 0]);
        const ventaId = ventaResult.insertId;
        
        // Insertar en la tabla de descripcion_ventas
        await Coonexion.execute('INSERT INTO descripcion_ventas (id_venta, id_relacion, cantidad, subtotal) VALUES (?, ?, ?, ?)', [ventaId, id_relacion, 1, 0]);
        
        res.status(200).json(['Compra realizada exitosamente']);
    } catch (error) {
        console.error('Error al insertar venta:', error);
        res.status(500).json(['Error al realizar la compra']);
    }
}

/*
export const BlockUser = async(req, res) =>{
    const {nombre, pass} = req.body 
    try {
        const [user] = await Coonexion.query('CALL obtenerUsuarioNombre(?)', [nombre])
        
        await Coonexion.execute('CALL actualizarEstadoUsuario(?, ?)', [usuario_id, nuevo_estado]);
    } catch (error) {
        console.log(error)
    }
}
Obtener un solo cliente

export const GetClientesId = async (req,res)=>{
    try {
        const [result] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente=?',[req.params.id])
        if(result.length <= 0) return res.status(404).json({
            message: 'Dato no encontrado'
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

//Crear un usuario
export const PostClientes = async (req,res)=>{
    try {
        const {nombre, telefono, Pass} = req.body
        const [rows] = await Coonexion.query('INSERT INTO Clientes (nombre, telefono, Pass) VALUES (?,?,?)',[nombre, telefono, Pass])
        res.send({
            id: rows.insertId,
            nombre,
            telefono,
            Pass,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}  

//Eliminar usuario
export const DeleteClientes = async (req,res) =>{
    try {
        const [result] = await Coonexion.query('DELETE FROM clientes WHERE id_cliente = ?',[req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: "No eliminado"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


//Actualiza un cliente general
export const PutClientes = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre,telefono, Pass} = req.body
        const [result] = await Coonexion.query('UPDATE clientes SET nombre = ?, telefono = ?, Pass = ? WHERE id_cliente = ?',[nombre,telefono,Pass,id])
        
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "cliente no existente"
        })
        
        const [act] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]) 
        
        res.json(act[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

//Actualiza un cliente parcialmente
export const PatchClientes = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre,telefono, Pass} = req.body
        
        const [result] = await Coonexion.query('UPDATE clientes SET nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono), Pass = IFNULL(?, Pass) WHERE id_cliente = ?',[nombre,telefono,Pass,id])
        
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "cliente no existente"
        })
        
        const [act] = await Coonexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]) 
        
        res.json(act[0])
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}*/
