import express from 'express'
import ProductManager from './classes/ProductManager.js'

const productManager = new ProductManager('./database/products.json')

const app = express()

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './src/views' })
})

app.get('/products', async (req, res) => {
  const products = await productManager.getProducts()
  if (req.query.limit) {
    res.json({ path: '/products', products: products.slice(0, req.query.limit) })
  } else {
    res.json({ path: '/products', products })
  }
})

app.get('/products/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid))
  res.json({ path: '/products/:pid', product })
})

const server = app.listen(8080)