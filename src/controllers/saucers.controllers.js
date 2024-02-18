import { Coonexion } from "../db.js";

//traer todos  los platillos
export const GetMenu = async (req, res) =>{
  try {
    const [result] = await Coonexion.query(`
    SELECT
      RP.id_relacion,
      P.nombre AS platillo_nombre,
      P.descripcion AS platillo_descripcion,
      P.imagen AS platillo_imagen,
      PP.nombre AS presentacion_nombre,
      RP.precio_adicional
    FROM
      Relacion_Presentacion_Platillo RP
    JOIN
      Platillos P ON RP.id_platillo = P.id_platillo
    JOIN
      Presentaciones PP ON RP.id_presentacion = PP.id_presentacion
  `);
    res.json(result)
  } catch (error) {
    return res.status(500).json(['error al traer el menu'])
  }
}

//Buscar un solo producto
export const getBuscarPlatillo = async (req,res) =>{
  const {nombre} = req.body
  try {
    const [result] = await Coonexion.execute(`
      SELECT
      RP.id_relacion,
      P.nombre AS platillo_nombre,
      P.descripcion AS platillo_descripcion,
      P.imagen AS platillo_imagen,
      PP.nombre AS presentacion_nombre,
      RP.precio_adicional
    FROM
      Relacion_Presentacion_Platillo RP
    JOIN
      Platillos P ON RP.id_platillo = P.id_platillo
    JOIN
      Presentaciones PP ON RP.id_presentacion = PP.id_presentacion
    WHERE
    P.nombre = ?
    `, [nombre])
    res.json(result);
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).send('Error interno del servidor')
  }
}


//filtrar por categorias
export const GetCategoria = async (req, res) => {
  const {categoria} = req.body
  try {
    const [result] = await Coonexion.execute(`
      SELECT
      RP.id_relacion,
      P.nombre AS platillo_nombre,
      P.descripcion AS platillo_descripcion,
      P.imagen AS platillo_imagen,
      PP.nombre AS presentacion_nombre,
      RP.precio_adicional
    FROM
      Relacion_Presentacion_Platillo RP
    JOIN
      Platillos P ON RP.id_platillo = P.id_platillo
    JOIN
      Presentaciones PP ON RP.id_presentacion = PP.id_presentacion
    WHERE
    P.id_categoria = ?
    `, [categoria])
    res.json(result);
  } catch (error) {
    console.error('Error en la consulta:', error)
    res.status(500).send('Error interno del servidor')
  }
}

//Muestra los elementos de reservaciones
export const GetDataReservation = async(req,res) =>{
  try {
    const [mesas] = await Coonexion.query('SELECT * FROM mesas')
    const [typeR] = await Coonexion.query('SELECT * FROM tiposreservacion')
    const [areas] = await Coonexion.query('SELECT * FROM areas')
    const result = {mesas, typeR, areas}
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      message:"Ocurrio un error"
  })
  }
}

//Visualiza los platillos agregados al carrito
export const GetCarrito = async (req,res) =>{
  try {
    //
  } catch (error) {
    //
  }
}


// Agregar platilos a un carrito
export const PostCarrito = async (req, res) =>{
  try {
    //
  } catch (error) {
    //
  }
}


//Eliminar producto del carrito
export const DeleteCarrito = async (req,res) =>{
  try {
    //
  } catch (error) {
    //
  }
}