import express, { Router } from 'express'
import { FileManager } from '../class/FileManager.js'
import { randomUUID } from 'crypto'
import { Cart } from '../class/Cart.js'

export const apiRouterCarts = Router()

apiRouterCarts.use(express.json())
// apiRouterCarts.use(express.urlencoded({ extended: true }))

const cartManager = new FileManager('./database/carts.json')

apiRouterCarts.get('/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartManager.buscarCosaSegunId(req.params.cid)
        res.json(cart)
    } catch (error) {
        next(error)
    }
})


apiRouterCarts.post('/carts', async (req, res, next) => {
    try {
        const cart = new Cart({
            id: randomUUID()
        })
        const agregado = await cartManager.guardarCosa(cart)
        res.json(agregado)
    } catch (error) {
        next(error)
    }
})

apiRouterCarts.post('/carts/:cid/product/:pid', async (req, res, next) => {
    let cart // d2fd6466-54a6-4da4-b912-6baa10d95f7b
    let nuevoProducto // f18df687-c618-4c5b-8464-174715f8a6fe
    
})