import { Coonexion } from "../db.js";

import bcrypt from 'bcrypt';
import { CreateAccessToken } from "../libs/jwt.js";

//Comparar datos encriptados
const compareData = async (data, hash) => {
    return await bcrypt.compare(data, hash)
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
        
        res.cookie('token', token, {})
        res.json({
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(['Error al iniciar sesión'])
    }
}