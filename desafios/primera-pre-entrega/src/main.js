import express from 'express'
import { apiRouterProduct } from './routes/apiRouter.js'

const app = express()

app.use(apiRouterProduct)

app.use((error, req, res, next) => {
  switch (error.message) {
      case 'id no encontrado':
          res.status(404)
          break
      case 'Contructor Product error: An argument is missing':
          res.status(400)
          break
      default:
          res.status(500)
  }
  res.json({ message: error.message })
})

const PORT = 8080
app.listen(PORT, () => {console.log(`listening in ${PORT}`)})