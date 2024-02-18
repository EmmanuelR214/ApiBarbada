import { Coonexion } from "../db.js"
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
    const {numero, pass} = req.body
    try {
        const [result] = await Coonexion.query('SELECT * FROM usuarios WHERE telefono = ?',[numero])
        if(result.length > 0){
            const password = await hashData(pass)
            await Coonexion.execute('UPDATE usuarios SET passwordUs = ? WHERE telefono = ?',[password, numero])
            
            return res.status(200).json([result[0]])
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
        const [checkUid] = await Coonexion.query('SELECT * FROM usuarios WHERE nombre = ? AND UID = ?', [nombre,uid])
        
        if(checkUid.length > 0) {
            const id = checkUid[0].id_usuario
            const token = await CreateAccessToken({id: id})
            
            res.cookie('token', token)
            res.status(200).json([checkUid[0], 'login'])
            return
        } 
        
        const pass = await hashData(uid)
        
        const [insertUID] = await Coonexion.execute('INSERT INTO usuarios (nombre, passwordUs, UID, id_rol) VALUES (?,?,?,?)',[nombre,pass, uid, rol ])  
        
        const id = insertUID.insertId
        const [lookforId] = await Coonexion.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
        
        const token = await CreateAccessToken({id: id})
        
        res.cookie('token', token)
        res.status(200).json([lookforId[0], 'register'])
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
            
            const [userFound] = await Coonexion.query('SELECT * FROM usuarios WHERE id_usuario = ?', [user.id])
            
            if(!userFound) return res.status(401).json({message:'Unauthorized'})
            
            const dataUser = userFound[0]
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
    try {
        const [result] = await Coonexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre])
        
        if(result.length > 0){
            const user = result[0]
            const PasswordValid = await compareData(password, user.passwordUs)
            
            if (!PasswordValid) return res.status(400).json( ["Contraseña incorrecta"] )
            
            const token = await CreateAccessToken({id: user.id_usuario})
            res.cookie('token', token)
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
    const {nombre, telefono, password} = req.body
    const rol = 1
    try {
        const [repeaterUser] = await Coonexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre])
        
        const [repeaterPhone] = await Coonexion.query('SELECT * FROM usuarios WHERE telefono = ?', [telefono])
        
        if(repeaterUser.length > 0) return res.status(400).json(['El nombre de usuario ya esta en uso'])
        
        if(repeaterPhone.length > 0) return res.status(400).json(['El numero de telefono ya esta en uso'])
        
        const pass = await hashData(password)
        
        const [rows] = await Coonexion.execute('INSERT INTO usuarios (nombre, telefono, passwordUs, UID ,id_rol) VALUES (?,?,?,?,?)',[nombre, telefono, pass, 'normal' ,rol])
        
        const idUser = rows.insertId
        
        const [resultUserData] = await Coonexion.query('SELECT * FROM usuarios WHERE id_usuario=?',[idUser]) 
        
        const dataUser = resultUserData[0]
        
        const token = await CreateAccessToken({id: idUser})
        
        res.cookie('token', token)
        res.json({
            dataUser
        })
    } catch (error) {
        res.status(500).json(['Error interno del servidor'] );
    }
}  

export const PostLogout = (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const PostDataUser = async(req, res) =>{
    const {id} = req.body
    try {
        const [result] = await Coonexion.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
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