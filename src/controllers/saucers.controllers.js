import { Coonexion } from "../db.js";

//traer todos  los platillos
export const GetMenu = async (req, res) => {
  try {
    const {categoria, platillo} = req.body
    let query = 'CALL ObtenerMenu()'
    
    const [[result]] = await Coonexion.execute(query);
    const [[category]] = await Coonexion.execute('CALL ObtenerCategorias()')
    
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


//TODO: Carrito
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

//! Actualizar
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


//TODO: PARTEDE ADMIN

export const TraerDatosPlatillo = async(req, res) =>{
  try {
    const [[Tamaños]] =  await Coonexion.execute('CALL ObtenerTamaños()')
    const [[Categorias]] =  await Coonexion.execute('CALL ObtenerCategorias()')
    const [[Presentaciones]] =  await Coonexion.execute('CALL ObtenerPresentaciones()')
    const [[Platillos]] =  await Coonexion.execute('CALL ObtenerPlatillosRecomendacion()')
    const [[Guarniciones]] = await Coonexion.execute('CALL ObtenerGuarniciones()')
    res.status(200).json([Tamaños, Categorias, Presentaciones, Platillos, Guarniciones])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al traer los datos del platillos'])
  }
}

export const TraerDatosPlatilloActualizar = async(req, res) =>{
  try {
    const {id} = req.body
    const [[platilloGeneral]] = await Coonexion.execute('CALL DatosActualizarPlatillo(?)',[id])
      res.status(200).json([platilloGeneral]);
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al traer los datos del platillos'])
  }
}

export const InsertPlatillo = async (req, res) => {
  try {
    const { platillo, descripcion, categoria, imagen, combinaciones, extras, guarniciones } = req.body;
    // Insertar el nuevo platillo en la tabla de platillos
    const [result] = await Coonexion.execute('INSERT INTO platillos (nombre, descripcion, imagen, id_estadoPlatillo, id_categoria, id_sucursal, platillo_disponible) VALUES (?, ?, ?, ?, ?, ?, ?)', [platillo, descripcion, imagen, 3, categoria, 1, true]);
    const nuevoIdPlatillo = result.insertId;
    // Insertar las combinaciones de presentaciones y tamaños en la tabla de relacion_presentacion_tamaño
    for (const combinacion of combinaciones) {
      const { tamaño, presentacion, valor } = combinacion;
      const idTamaño = tamaño.value;
      const idPresentacion = presentacion.value;
      const precioAdicional = valor;
      await Coonexion.execute('INSERT INTO relacion_presentacion_tamaño (id_platillo, id_presentacion, id_tamaño, precio_adicional) VALUES (?, ?, ?, ?)', [nuevoIdPlatillo, idPresentacion, idTamaño, precioAdicional]);
    }
    // Insertar las recomendaciones en la tabla de recomendaciones
    for (const extra of extras) {
      const { value, label, precio } = extra;
      const idPlatilloRecomendado = value;
      const tipo = 'acompañamiento';
      await Coonexion.execute('INSERT INTO recomendaciones (id_platillo_principal, id_platillo_recomendado, tipo) VALUES (?, ?, ?)', [nuevoIdPlatillo, idPlatilloRecomendado, tipo]);
    }
    for (const guarnicion of guarniciones) {
      const { value, label, precio } = guarnicion;
      const idPlatilloRecomendado = value;
      const tipo = 'guarnicion';
      await Coonexion.execute('INSERT INTO recomendaciones (id_platillo_principal, id_platillo_recomendado, tipo) VALUES (?, ?, ?)', [nuevoIdPlatillo, idPlatilloRecomendado, tipo]);
    }
    res.status(200).json({ message: 'Platillo insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al insertar un platillo.' });
  }
};

export const MostrarPlatillosAdmin = async(req, res) =>{
  try {
    const [[result]] = await Coonexion.execute('CALL ObtenerListaPlatillo()')
    res.status(200).json([result])
  } catch (error) {
    res.status(500).json(['Error al traer los platillos'])
  }
}

export const EliminarPlatillo = async(req, res) =>{
  try {
    const {id} = req.body;
    const [result] = await Coonexion.execute('SELECT id_platillo FROM relacion_presentacion_tamaño WHERE id_relacion = ?', [id]);
    const idPlato = result[0].id_platillo;
    
    // Eliminar filas de la tabla recomendaciones que hacen referencia a la fila que se eliminará en la tabla relacion_presentacion_tamaño
    await Coonexion.execute('DELETE FROM recomendaciones WHERE id_platillo_recomendado IN (SELECT id_relacion FROM relacion_presentacion_tamaño WHERE id_platillo = ?)', [idPlato]);
    
    // Luego, eliminar la fila de la tabla relacion_presentacion_tamaño
    await Coonexion.execute('DELETE FROM relacion_presentacion_tamaño WHERE id_platillo = ?', [idPlato]);
    
    // Finalmente, eliminar la fila de la tabla platillos
    await Coonexion.execute('DELETE FROM platillos WHERE id_platillo = ?', [idPlato])
    
    res.status(200).json(['Platillo Eliminado']);
  } catch (error) {
    console.log(error);
    res.status(500).json(['Error al eliminar el platillo']);
  }
}

export const CrearVenta = async(req, res) =>{
  try {
    const { id_usuario, sumaSubtotales, id_direccion, metodoPago, precio, cambio, carrito } = req.body;
    const fechaActual = new Date();
    const estado = 'Pendiente';
    //Insertar en la tabla de ventas
    const [ventaResult] = await Coonexion.execute('INSERT INTO ventas (id_usuario, total, estado_pedido, fecha_venta, id_direccion, id_metodo_pago, monto_pagado, cambio_devuelto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_usuario, sumaSubtotales, estado, fechaActual, id_direccion, metodoPago, precio, cambio]);
    const ventaId = ventaResult.insertId;
    // Insertar en la tabla de descripcion_ventas
    for (const item of carrito) {
      const { id_relacion, cantidad, subtotal } = item;
      await Coonexion.execute('INSERT INTO descripcion_ventas (id_venta, id_relacion, cantidad, subtotal) VALUES (?, ?, ?, ?)', [ventaId, id_relacion, cantidad, subtotal]);
    }
    for (const item of carrito) {
      const { id_carrito } = item;
      // Eliminar el elemento del carrito en la base de datos
      await Coonexion.execute('DELETE FROM carrito WHERE id_carrito = ?', [id_carrito]);
    }
    
    //Otras acciones según sea necesario (por ejemplo, actualizar inventario)
    res.status(200).json(['Compra realizada exitosamente']);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
}





//TODO:
// export const TraerCategorias = async(req, res) => {
//   try {
//     const [result] = await Coonexion.execute('SELECT DISTINCT c.id_categoria, c.nombreCategoria FROM categorias c JOIN platillos p ON c.id_categoria = p.id_categoria JOIN relacion_presentacion_tamaño rpt ON p.id_platillo = rpt.id_platillo')
//     res.status(200).json([result])
//   } catch (error) {
//     res.status(500).json(['Error al traer las categorias'])
//   }
// }

// export const FiltroCategoria = async(req, res) =>{
//   try {
//     const {id} = req.body
//     const [result] = await Coonexion.execute('SELECT DISTINCT p.* FROM relacion_presentacion_tamaño rpt JOIN platillos p ON rpt.id_platillo = p.id_platillo WHERE p.id_categoria = ?',[id])
//     res.status(200).json([result])
//   } catch (error) {
//     res.status(500).json(['Error al traer los platillos'])
//   }
// }

// export const DescPlat = async(req, res) =>{
//   try {
//     const {id} = req.body
//     const [res2] = await Coonexion.execute('SELECT DISTINCT rp.id_relacion, rp.id_presentacion, pr.nombrePresentacion, rp.id_tamaño, tp.tamaño FROM relacion_presentacion_tamaño rp JOIN presentaciones pr ON rp.id_presentacion = pr.id_presentacion JOIN tamaño_platillo tp ON rp.id_tamaño = tp.id_tamaño WHERE rp.id_platillo = ?',[id])
//     res.status(200).json([res2])
//   } catch (error) {
//     res.status(500).json(['Error al traer los platillos'])
//   }
// }


// export const TraerVentas = async (req, res) => {
//   try {
//     const { mes, platillo } = req.body;
//     const [result] = await Coonexion.execute('SELECT * FROM ventas v INNER JOIN descripcion_ventas dv ON v.id_venta = dv.id_venta WHERE MONTH(v.fecha_venta) = ? AND YEAR(v.fecha_venta) = 2024 AND dv.id_relacion = ?', [mes, platillo]);

//     const totalVentas = result.length; 
    
//     console.log(result);
//     console.log(totalVentas);
//     res.status(200).json([totalVentas]);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error al traer las ventas del mes' });
//   }
// };

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