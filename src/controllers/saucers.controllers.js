import { Coonexion } from "../db.js";

//traer todos  los platillos
export const GetMenu = async (req, res) => {
  try {
    const {categoria, platillo} = req.body
    let query = 'CALL ObtenerMenu()'
    
    // if(categoria) query = ''
    
    
    
    const [[result]] = await Coonexion.execute('CALL ObtenerMenu()')
    const [[category]] = await Coonexion.execute('CALL ObtenerCategorias()')
    
    console.log(result)
    res.json([result, category])
  } catch (error) {
    console.error(error)
    res.status(500).json(['Error al traer el Menú'])
  }
}

/*
export const getMenu = async (req, res) => {
  try {
    const { categoria, nombreProducto } = req.query;
    let query = 'CALL ObtenerMenu()';

    // Si se especifica una categoría, modificar la consulta
    if (categoria) {
      query = `CALL ObtenerProductosPorCategoria('${categoria}')`;
    }

    // Si se especifica un nombre de producto, modificar la consulta
    if (nombreProducto) {
      query = `CALL BuscarProductoPorNombre('${nombreProducto}')`;
    }

    const [[result]] = await Coonexion.execute(query);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(['Error al obtener el menú']);
  }
};
*/

export const DescripcionPlatillo = async(req, res) =>{
  try {
    const descPro = req.params.descPro;
    const [[result]] = await Coonexion.execute('CALL ObtenerDetallePlatillo(?)', [descPro])
    
    if (!result[0]) res.status(400).json(['No se pudo obtener el platillo'])
    
    const [[result2]] = await Coonexion.execute('CALL ObtenerRecomendaciones(?)', [descPro])
    console.log([result[0], result2])
    
    if (!result2[0]) res.status(400).json(['No se pudo obtener las recomendaciones'])
    
    res.status(200).json([result[0], result2])
  } catch (error) {
    console.log(error);
    res.status(500).json(['error al obtener el detalle del platillo']);
  }
}

export const ObtenerPrecio = async(req,res) =>{
  try {
    const {id,tam,pre} = req.body
    
    const [[precio]] = await Coonexion.execute('CALL ObtenerPrecioPlatillo(?,?,?)',[id, pre, tam])
    
    if(!precio[0]) return res.status(400).json(['No se pudo obtener el precio'])
    
    res.status(200).json([precio[0]])
  } catch (error) {
    console.log(error);
    res.status(500).json(['error al obtener el precio']);
  }
}

export const ObtenerDetallesXprecio = async(req,res) =>{
  try {
    const {id,pre} = req.body
    
    const [[precio]] = await Coonexion.execute('CALL ObtenerDetallePlatilloPrecio(?,?)',[id, pre])
    
    if(!precio[0]) return res.status(400).json(['No se pudo obtener el precio'])
    
    res.status(200).json([precio[0]])
  } catch (error) {
    console.log(error);
    res.status(500).json(['error al obtener el precio']);
  }
}

export const InsertPlatillo = async(req, res) =>{
  try {
    const {nombre, descripcion, imagen, id_categoria, id_presentacion, id_tamaño, precio_adicional} = req.body
    const id_sucursal = 1
    const id_estadoPlatillo = 3
    const platillo_disponible = 1
    console.log(nombre, descripcion, imagen, platillo_disponible, id_estadoPlatillo, id_categoria, id_sucursal, id_presentacion, id_tamaño, precio_adicional)
    
    
    const [newSaucers] = await Coonexion.execute('CALL InsertarNuevoPlatillo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[nombre, descripcion, imagen, platillo_disponible, id_estadoPlatillo, id_categoria, id_sucursal, id_presentacion, id_tamaño, precio_adicional])
    
    if (newSaucers.affectedRows > 0){
      const [[result]] = await Coonexion.execute('SELECT * FROM platillos')
      const [[result2]] = await Coonexion.execute('SELECT * FROM relacion_presentacion_tamaño') 
      res.status(200).json([result, result2])
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al insertar un platillo'])
  }
}

export const InsertShoppinCar = async(req, res) =>{
  try {
    const {id_platillo, id_usuario, cantidad, total} = req.body
    
    console.log(id_platillo, id_usuario, cantidad, total)
    
    
    const [[searchPlatillo]] = await Coonexion.execute('CALL ObtenerCarrito(?)',[id_platillo])
    console.log(searchPlatillo, 'juan')
    if(searchPlatillo.length > 0) {
      console.log(searchPlatillo,1)
      let id_car = searchPlatillo[0].id_carrito
      let cant = searchPlatillo[0].cantidad
      let canti = cant + cantidad
      let sub = parseFloat(searchPlatillo[0].subtotal)
      let tot = sub + total
      const [result] = await Coonexion.execute('CALL ActualizarCarrito(?,?,?)',[id_car, canti, tot])
      if(result.affectedRows === 0) return res.status(400).json(['Ocurrio un error al agregar al carrito'])
      res.status(200).json(['Se ha agregado al carrito'])
    }else{
      const [result] = await Coonexion.execute('CALL InsertarCarrito(?,?,?,?)',[id_platillo, id_usuario, cantidad, total])
      
      if(result.affectedRows === 0) return res.status(400).json(['Ocurrio un error al agregar al carrito'])
      
      res.status(200).json(['Se ha agregado al carrito'])
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al agregar al carrito'])
  }
}

export const GetShoppingCar = async(req,res) =>{
  try {
    const id = req.params.idUser
    const [[result]] = await Coonexion.execute('CALL ObtenerCarrito(?)', [id])
    console.log(result)
    res.status(200).json([result])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al traer el carrito'])
  }
}

export const UpdateShoppingCar = async(req, res) =>{
  try {
    const {id_carrito, cantidad, subtotal} = req.body
    if(cantidad < 1) return res.status(400).json(['No se actualizo la cantidad'])
    const [result] = await Coonexion.execute('CALL ActualizarCarrito(?,?,?)',[id_carrito, cantidad, subtotal])
    if(result.affectedRows === 0) return res.status(400).json(['Ocurrio un error al agregar al carrito'])
    res.status(200).json(['Se actualizo la cantidad'])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al actualizar el carrito'])
  }
}

export const DeleteCarrito = async(req, res) =>{
  try {
    const id_carrito = req.params.id_car
    const [delet] = await Coonexion.execute('CALL EliminarItemCarrito(?)', [id_carrito]) 
    if(delet.affectedRows === 0) return res.status(400).json(['Ocurrio un error al eliminar del carrito'])
    res.status(200).json(['Se elimino del carrito'])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al eliminar el carrito'])
  }
}


/*//Buscar un solo producto
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
}*/