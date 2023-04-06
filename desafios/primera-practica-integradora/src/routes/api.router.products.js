import express, { Router } from 'express'
import { FileManager } from '../classes/FileManager.js'
import { Product } from '../classes/Product.js'
import { productManager } from '../managers/ProductManager.js'

export const apiRouterProducts = Router()

apiRouterProducts.use(express.json())
apiRouterProducts.use(express.urlencoded({ extended: true }))

const productManagerOld = new FileManager('./database/products.json')

apiRouterProducts.get('/products', async (req, res, next) => {
    try {
        const products = await productManager.getAllProducts()
        res.render('products', {
            pageTitle: 'Products',
            thereAreProducts: products.length > 0,
            products: products
        })
    } catch (error) {
        next(error)
    }
})

apiRouterProducts.get('/products/:pid', async (req, res, next) => {
    try {
        const product = await productManager.getProductById(req.params.pid)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

apiRouterProducts.post('/products', async (req, res, next) => {
    try {
        const product = new Product(req.body)
        const result = await productManager.save(product.getData())
        // console.log('result -> ', result);
        
        req['io'].sockets.emit('products', await productManager.getAllProducts())

        res.send(result)
    } catch (error) {
        next(error)
    }
})

apiRouterProducts.put('/products/:pid', async (req, res, next) => {
    let nuevoProducto
    try {
        nuevoProducto = new Product({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        next(error)
        return
    }

    try {
        const productoReemplazado = await productManagerOld.reemplazarCosa(req.params.pid, nuevoProducto)
        res.json(productoReemplazado)
    } catch (error) {
        next(error)
    }
})

apiRouterProducts.delete('/products/:pid', async (req, res, next) => {
    try {
        const borrado = await productManagerOld.borrarCosaSegunId(req.params.pid)
        res.json(borrado)
    } catch (error) {
        next(error)
    }
})
