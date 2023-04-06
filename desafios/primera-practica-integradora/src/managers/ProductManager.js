import mongoose from "mongoose"

const schemaProducts = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  code: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  category: { type: String, require: true },
  status: { type: String, require: false },
  thumbnails: { type: String, require: false }
})

class ProductManagerManager {
  #productsDb
  constructor() {
    this.#productsDb = mongoose.model('products', schemaProducts)
  }

  async save(dataProduct) {
    let productSaved = await this.#productsDb.create(dataProduct)
    productSaved = JSON.parse(JSON.stringify(productSaved))
    return productSaved
  }

  async getAllProducts() {
    const products = await this.#productsDb.find().lean()
    return products
  }

  async getProductById(id) {
    const product = await this.#productsDb.findById(id).lean()
    return product
  }

  // TODO: update
  // TODO: delete
}

export const productManager = new ProductManagerManager()

