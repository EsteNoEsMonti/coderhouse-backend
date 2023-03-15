import express, { Router } from 'express'
import { FileManager } from '../class/FileManager.js'
import { randomUUID } from 'crypto'
import { Cart } from '../class/Cart.js'

export const apiRouterCarts = Router()

apiRouterCarts.use(express.json())

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
    const cart = await cartManager.buscarCosaSegunId(req.params.cid)
    let index = cart.products.findIndex(e => e.product == req.params.pid)
    if (index === -1 || index == undefined) {
        cart.products.push({
            product: req.params.pid,
            quantity: 1
        })
        const nuevoCart = await cartManager.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
    } else {
        cart.products[index].quantity++
        const nuevoCart = await cartManager.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
    }
})
