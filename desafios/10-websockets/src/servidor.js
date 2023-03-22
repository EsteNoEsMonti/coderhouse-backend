import express from 'express'
import { apiRouterCarts } from './routes/apiRouterCarts.js'
import { apiRouterProducts } from './routes/apiRouterProducts.js'
// @ts-ignore
import { engine } from 'express-handlebars'
// @ts-ignore
import { Server as SocketIOServer } from 'socket.io'
import { FileManager } from './class/FileManager.js'

const productManager = new FileManager('./database/products.json')

const app = express()

app.use(apiRouterProducts)
app.use(apiRouterCarts)

app.use((error, req, res, next) => {
    switch (error.message) {
        case 'id no encontrado':
            res.status(404)
            break
        case 'Contructor Product error: An argument is missing':
            res.status(400)
            break
        case 'Contructor Cart error: An argument is missing':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

const PORT = 8080
const httpServer = app.listen(PORT, () => { console.log(`listening in ${PORT}`) })

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id}`)

    const products = await productManager.buscarCosas()
    io.sockets.emit('productList', products)

    clientSocket.on('newRealTimeProduct', async product => {
        await productManager.guardarCosa(product)
        const productsForFront = await productManager.buscarCosas()
        io.sockets.emit('uploadRealTimeProducts', productsForFront)
    })

    clientSocket.on('deleteRealTimeProduct', async id => {
        try {
            await productManager.borrarCosaSegunId(id)
            const productsForFront = await productManager.buscarCosas()
            io.sockets.emit('uploadRealTimeProducts', productsForFront)
        } catch (error) {
            console.log(error)
        }

        await productManager.borrarCosaSegunId(id)
        const productsForFront = await productManager.buscarCosas()
        io.sockets.emit('uploadRealTimeProducts', productsForFront)
    })
})

app.get('/', async (req, res) => {
    res.render('home', {
        pageTitle: 'products list'
    })
})

app.get('/realTimeProducts', async (req, res) => {
    res.render('realTimeProducts', {
        pageTitle: 'realTimeProducts'
    })
})
