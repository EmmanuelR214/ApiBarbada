<?php
// Verificar si se recibió un archivo
if(isset($_FILES['imagen'])) {
  $file = $_FILES['imagen'];
  
  // Ruta donde se guardará la imagen en el servidor
  $targetDir = "img/";
  $targetFile = $targetDir . basename($file["name"]);
  
  // Mover el archivo al directorio de destino
  if (move_uploaded_file($file["tmp_name"], $targetFile)) {
    echo "La imagen ". basename($file["name"]). " ha sido subida correctamente.";
  } else {
    echo "Hubo un error al subir la imagen.";
  }
} else {
  echo "No se recibió ninguna imagen.";
}
?>
