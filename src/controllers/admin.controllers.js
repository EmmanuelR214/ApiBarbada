import { Coonexion } from "../db.js";

import bcrypt from 'bcrypt';
import { CreateAccessToken } from "../libs/jwt.js";

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

//Comparar datos encriptados
const compareData = async (data, hash) => {
    return await bcrypt.compare(data, hash)
}

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

export const verifYTokenAdmin = async(req, res) =>{
    try {
        const {tokenadmin} = req.cookies
        if(!tokenadmin) return res.status(401).json(['Unauthorized'])
            jwt.verify(tokenadmin, TOKEN_SECRET, async (err, user) => {
                if(err) return res.status(401).json(['Unauthorized'])
            
            const [userFound] = await Coonexion.query('CALL obtenerUsuarioID(?)', [user.id])
            
            if(!userFound[0]) return res.status(401).json(['Unauthorized'])
            
            const [[dataUser]] = userFound
            console.log(dataUser)
            return res.json({
                id: dataUser.id_usuario,
                rol: dataUser.roles
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error del servidor'])
    }
}

//Traer todos los usuarios
export const GetClientes = async (req,res)=>{

}

export const LoginAdmin = async(req, res) =>{
    try {
        const {telefono, password} = req.body
        const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioTelefono(?)',[telefono])
        const user = result[0]
        
        if(!user) return res.status(400).json(['El usuario no coincide'])
        
        if(user.roles === 'cliente') return res.status(400).json(['No tienes permisos para acceder'])
        
        const PasswordValid = await compareData(password, user.passwordUs)
        if (!PasswordValid) return res.status(400).json( ["Contraseña incorrecta"] )
        
        const token = await CreateAccessToken({id: user.id_usuario})
        
        res.cookie('tokenadmin', token, {})
        res.json([user.id_usuario, user.roles])
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al iniciar sesión'])
    }
}







/*
export const DataForNewPlatillo = async(req, res) =>{
    try {
        const gu = 'guarnicion'
        const aco = 'acompañamiento'
        const [categorias] = await Coonexion.execute('SELECT * FROM categorias')
        const [tamaños] = await Coonexion.execute('SELECT * FROM tamaño_platillo')
        const [present] = await Coonexion.execute('SELECT * FROM presentaciones')
        const [guarniciones] = await Coonexion.execute('SELECT * FROM vista_recomendaciones WHERE tipo = ?',[gu])
        const [recomendacion] = await Coonexion.execute('SELECT * FROM vista_recomendaciones WHERE tipo = ?',[aco])
        console.log(categorias)
        res.status(200).json([categorias, tamaños, present, guarniciones, recomendacion])
    } catch (error) {
        console.log(error)
        res.status(500).json(['Hubo un error al obtener los datos'])
    }
}
*/
