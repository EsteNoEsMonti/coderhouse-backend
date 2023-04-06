import { Videojuego } from '../entidades/videojuego.js';
import { videojuegosManager } from '../managers/videojuegos.manager.js';

export async function postVideojuegosController(req, res, _next) {
  const videojuego = new Videojuego(req.body);
  const result = await videojuegosManager.guardar(videojuego.datos());
  console.log('result -> ', result);

  req['io'].sockets.emit('videojuegos', await videojuegosManager.obtenerTodos())
  
  res.send(result);
}
