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
    const cart = await cartManager.buscarCosaSegunId(req.params.cid) // d2fd6466-54a6-4da4-b912-6baa10d95f7b
    let index = cart.products.findIndex(e => e.product == req.params.pid)
    console.log(cart)
    console.log(index)
    if (!index) {
        console.log('if ', index);
        cart.products[index].quantity++
        const nuevoCart = await cartManager.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
        
    } else {
        console.log('else ', index);
        cart.products.push({
            product: req.params.pid,
            quantity: 1
        })
        const nuevoCart = await cartManager.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
    }
})