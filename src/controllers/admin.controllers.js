import { Coonexion } from "../db.js";

//Traer todos los usuarios
export const GetClientes = async (req,res)=>{
    const {id} = req.body
    try {
        const [userFound] = await Coonexion.query('SELECT * FROM usuarios WHERE id_usuario = ? AND id_rol = 2',[id])
        if(!userFound) return res.status(401).json(['Not Access'])
        
        const [result] = await Coonexion.query('SELECT * FROM usuarios')
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            ["Ocurrio un error"]
        )
    }
}

export const GetPresentaciones = async(req, res) =>{
    try {
        // const [result] = await Coonexion.query('SELECT * FROM presentaciones')
        const [result] = await Coonexion.query('SELECT * FROM Prueba')
        console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//
export const LoginAdmin =  async(req,res)=>{
    const {nombre, password, rol} = req.body
    try {
        const [result] = await Coonexion.query('SELECT * FROM usuarios WHERE nombre = ? AND id_rol = ?', [nombre, rol])
        
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