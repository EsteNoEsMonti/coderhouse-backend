import mongoose from "mongoose"
import { productManager } from "./ProductManager.js"
import { CartProduct } from "../classes/Cart.js"

const schemaCart = new mongoose.Schema({
  products: { type: Array, require: false }
})

class CartManager {
  #cartsDb
  constructor() {
    this.#cartsDb = mongoose.model('cart', schemaCart)
  }

  async save(dataCart) {
    let cartSaved = await this.#cartsDb.create(dataCart)
    cartSaved = JSON.parse(JSON.stringify(cartSaved))
    return cartSaved
  }

  async getCartById(id) {
    const cart = await this.#cartsDb.findById(id).lean()
    return cart
  }

  async updateCart(cart) {
    const newCart = await this.#cartsDb.updateOne((cart))
    return newCart
  }

  async addProductInCart(cartID, productID) {
    const cart = await this.#cartsDb.findById(cartID).lean()
    const product = await productManager.getProductById(productID)

    // @ts-ignore
    let productIndex = cart.products.findIndex(e => JSON.stringify(e.id) === JSON.stringify(product._id))

    if (productIndex === -1 || productIndex == undefined) {
      // @ts-ignore
      const newCartProduct = new CartProduct({ id: product._id })
      // @ts-ignore
      cart.products.push(newCartProduct)
      await this.updateCart(cart)
      return cart
    }
    // @ts-ignore
    ++cart.products[productIndex].quantity

    await this.updateCart(cart)
    return cart
  }

  // TODO: delete
}

export const cartManager = new CartManager()

