import express from "express";
import { PORT } from "../config/servidor.config.js";
import { engine } from "express-handlebars";
import { routerApi } from "../routers/api.router.js";
import { routerVistas } from "../routers/views.router.js";
import { conectar } from "../database/mongoose.js";
import { Server } from 'socket.io'

await conectar()

const app = express()

const server = app.listen(PORT, () => {
  console.log(`🌙 Server listening on PORT:${PORT} 🦻🙉`)
})

const io = new Server(server)
io.on('connection', async socket => {
    console.log('🌙 cliente nuevo conectado')
})
// a cada cosa que me llegue le meto el 'io' en la petition
app.use((req, res, next) => {
    req['io'] = io
    next()
})

app.engine('handlebars', engine()) // como uso handlebars necesito cargarlo, con su engine
app.set('views', './views') // configuramos las carpetas de views
app.set('view engine', 'handlebars') // "si no te pone ninguna extencion usa handlebars"

app.use(express.static('./public')) //hacemos publica la carpeta public
app.use(express.json()) // como recibo formulario con json necesito parsearlo para que sea un objeto

app.use('/api', routerApi) // cargamos las rutas
app.use('/', routerVistas)
