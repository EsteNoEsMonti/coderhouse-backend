import express, { Router } from 'express'
import { FileManager } from '../class/FileManager.js'
import { randomUUID } from 'crypto'
import { Product } from '../class/Product.js'

export const apiRouterProduct = Router()

apiRouterProduct.use(express.json())
apiRouterProduct.use(express.urlencoded({ extended: true }))

const productManager = new FileManager('./database/products.json')

apiRouterProduct.get('/products', async (req, res, next) => {
    try {
        const products = await productManager.buscarCosas()
        res.json(products)
    } catch (error) {
        next(error)
    }
})

apiRouterProduct.get('/products/:pid', async (req, res, next) => {
    try {
        const product = await productManager.buscarCosaSegunId(req.params.pid)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

apiRouterProduct.post('/products', async (req, res, next) => {
    try {
        const product = new Product({
            id: randomUUID(),
            ...req.body
        })
        const agregado = await productManager.guardarCosa(product)
        res.json(agregado)
    } catch (error) {
        next(error)
    }
})

apiRouterProduct.put('/products/:pid', async (req, res, next) => {
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
        const productoReemplazado = await productManager.reemplazarCosa(req.params.pid, nuevoProducto)
        res.json(productoReemplazado)
    } catch (error) {
        next(error)
    }
})
apiRouterProduct.delete('/product/:pid', async (req, res, next) => {
    try {
        const borrado = await productManager.borrarCosaSegunId(req.params.pid)
        res.json(borrado)
        // res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})
