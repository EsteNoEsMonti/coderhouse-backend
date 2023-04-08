import express, { Router } from 'express'
import { FileManager } from '../classes/FileManager.js'
import { randomUUID } from 'crypto'
import { Cart } from '../classes/Cart.js'
import { getCartByIdController, getAddProductToCartController } from '../controllers/cart.get.controller.js'

export const apiRouterCarts = Router()

apiRouterCarts.use(express.json())

const cartManagerOld = new FileManager('./database/carts.json')

apiRouterCarts.get('/carts/:cid', getCartByIdController)

apiRouterCarts.get('/carts/:cid/product/:pid', getAddProductToCartController)

// old, delete?
apiRouterCarts.post('/carts', async (req, res, next) => {
    try {
        const cart = new Cart({
            id: randomUUID()
        })
        const agregado = await cartManagerOld.guardarCosa(cart)
        res.json(agregado)
    } catch (error) {
        next(error)
    }
})

apiRouterCarts.post('/carts/:cid/product/:pid', async (req, res, next) => {
    const cart = await cartManagerOld.buscarCosaSegunId(req.params.cid)
    let index = cart.products.findIndex(e => e.product == req.params.pid)
    if (index === -1 || index == undefined) {
        cart.products.push({
            product: req.params.pid,
            quantity: 1
        })
        const nuevoCart = await cartManagerOld.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
    } else {
        cart.products[index].quantity++
        const nuevoCart = await cartManagerOld.reemplazarCosa(req.params.cid, cart)
        res.json(nuevoCart)
    }
})
