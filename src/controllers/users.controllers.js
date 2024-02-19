//Conextion
import { Coonexion } from "../db.js"

//Dependencias
import {v4 as uuidv4} from 'uuid'

//Configuraciones
import bcrypt from 'bcrypt';
import { CreateAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


//Encriptar datos
const hashData = async (data) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const Encrypt = await bcrypt.hash(data, salt);
        return Encrypt;
    } catch (error) {
        console.error('Error encriptar datos:', error);
        throw error; 
    }
};

//Comparar datos encriptados
const compareData = async (data, hash) => {
    return await bcrypt.compare(data, hash);
};

//Reccuperar 
export const CompareUs = async (req, res) =>{
    const {telefono, pass} = req.body
    try {
        const [[result]] = await Coonexion.query('CALL obtenerUsuarioTelefono(?)',[telefono])
        
        if(result.length > 0){
            const [user] = result
            const password = await hashData(pass)
            await Coonexion.execute('CALL actualizarPasswordPorTelefono(?, ?)',[password, telefono])
            const token = await CreateAccessToken({id: user.id_usuario})
            res.cookie('token', token)
            return res.status(200).json([user])
        }
        return res.status(400).json(['Número no encontrado'])
    } catch (error) {
        res.status(500).json(['Error interno del servidor'])
    }
}

//Comprobar Facebook Google
export const PostRegisterUID = async (req, res) =>{
    const {nombre,uid} =  req.body
    const rol = 1
    try {   
        console.log('entro aqui')
        const [checkUid] = await Coonexion.query('CALL obtenerUsuarioNombreAndId(?, ?)', [nombre,uid])
        if(checkUid[0].length > 0) {
            const id = checkUid[0][0].id_usuario
            const token = await CreateAccessToken({id: id})
            
            res.cookie('token', token)
            res.status(200).json([checkUid[0][0], 'login'])
            return
        } else{
            const pass = await hashData(uid)
            
            await Coonexion.execute('CALL insertarUsuarioFGA(?, ?, ?, ?)',[uid,nombre,pass,rol])  
            
            const [lookforId] = await Coonexion.query('CALL obtenerUsuarioID(?)', [uid])
            
            const token = await CreateAccessToken({id: uid})
            
            res.cookie('token', token)
            res.status(200).json([lookforId[0][0], 'register'])
        }
    } catch (error) {
        
        console.error('Error al buscar usuario en la base de datos', error)
        res.status(500).json(['Error interno del servidor'])
    }
}

//Verifica el token
export const verifYToken = async(req, res) =>{
    const {token} = req.cookies
    
    try {
        if(!token) return res.status(401).json({message: 'Unauthorized'})
            jwt.verify(token, TOKEN_SECRET, async (err, user) => {
                if(err) return res.status(401).json({message:'Unauthorized'})
            
            const [userFound] = await Coonexion.query('CALL obtenerUsuarioID(?)', [user.id])
            
            if(!userFound[0]) return res.status(401).json({message:'Unauthorized'})
            
            const [[dataUser]] = userFound
            console.log(dataUser)
            return res.json({
                id: dataUser.id_usuario,
                nombre: dataUser.nombre,
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const LoginClient =  async(req,res)=>{
    const {nombre, password} = req.body
    console.log('entro', nombre, password)
    try {
        const [result] = await Coonexion.query('CALL obtenerUsuarioNombre(?)', [nombre])
        
        if(result[0].length > 0){
            const [[user]] = result
            const PasswordValid = await compareData(password, user.passwordUs)
            
            if (!PasswordValid) return res.status(400).json( ["Contraseña incorrecta"] )
            
            const token = await CreateAccessToken({id: user.id_usuario})
            
            res.cookie('token', token, {
                httpOnly: true, sameSite: 'none', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
            })
            // ,{ maxAge: 86400000, httpOnly: true, sameSite: 'none', secure: true, httpOnly: false}
            res.json({
                user
            })
        }
        else{
            res.status(400).json(['Usuario no existente'])
        }
    } catch (error) {
        console.error('Error al buscar usuario en la base de datos', error);
        res.status(500).json(['Error interno del servidor'] );
    }
}


export const PostClientes = async (req,res)=>{
    const { uid, nombre, telefono, password } = req.body
    const rol = 1
    const newId = uid ? uid : uuidv4()
    
    try {
        const [repeaterUser] = await Coonexion.query('CALL obtenerUsuarioNombre(?)', [nombre])
        console.log('entreo aqui')
        if (repeaterUser[0].length > 0) return res.status(400).json(['El nombre de usuario ya está en uso'])
        
        const [repeaterPhone] = await Coonexion.query('CALL obtenerUsuarioTelefono(?)', [telefono])
        if (repeaterPhone[0].length > 0) return res.status(400).json(['El número de teléfono ya está en uso'])
        
        const pass = await hashData(password)
        
        await Coonexion.execute('CALL insertarUsuario(?, ?, ?, ?, ?)', [newId, nombre, telefono, pass, rol])
        
        const [resultUserData] = await Coonexion.execute('CALL obtenerUsuarioID(?)', [newId])
        const dataUser = resultUserData[0]
        
        const token = await CreateAccessToken({ id: newId })
        res.cookie('token', token)
        res.json({
            dataUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(['Error interno del servidor'])
    }
}  

export const PostLogout = (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const PostDataUser = async(req, res) =>{
    
    try {
        const [result] = await Coonexion.query('SELECT * FROM usuarios')
        res.json(result[0])
    } catch (error) {
        res.status(500).json(error)
    }
}


/*
//Obtener un solo cliente
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
