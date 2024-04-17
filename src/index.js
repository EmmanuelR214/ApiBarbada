import app from "./app"
import { PORT } from "./config"

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('¡El API está en funcionamiento!');
});