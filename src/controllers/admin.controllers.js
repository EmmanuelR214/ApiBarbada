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

