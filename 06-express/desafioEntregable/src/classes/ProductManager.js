import fs from 'fs/promises'

export default class ProductManager {
  constructor(path) {
    this.path = path
  }

  async loadProducts() {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
  }

  async saveProducts() {
    const json = JSON.stringify(this.products, null, 2)
    await fs.writeFile(this.path, json)
  }

  async getProducts() {
    await this.loadProducts()
    // console.log('this.products -> ', this.products)
    return (this.products)
  }

  async addProduct(product) {
    await this.loadProducts()
    if (this.products.some(p => p.code === product.code)) {
      try {
        throw new Error(`Product Code is registered ❌ | The code '${product.code}' is registered`)
      } catch (error) {
        console.log(error)
      }
    } else {
      if (!validateParameters(product)) {
        try {
          throw new Error('Missing parameters ❌')
        } catch (error) {
          console.log(error)
        }
      } else {
        if (this.products.length === 0) {
          product.id = 0
        } else {
          product.id = this.products[this.products.length - 1].id + 1
        }
        this.products.push(product)
        await this.saveProducts()
        console.log(`Product added successfully ✅ | Product {id: ${product.id}, code: ${product.code}}`);
      }
    }
  }

  async getProductById(productId) {
    await this.loadProducts()
    const productFinded = await this.products.find(p => p.id === productId)
    if (!productFinded) {
      return `Not Found 🔌❌ | No product found with id '${productId}'`
    } else {
      return productFinded
    }
  }

  async deleteProduct(productId) {
    await this.loadProducts()
    const productFinded = await this.products.find(p => p.id === productId)
    if (!productFinded) {
      try {
        throw new Error(`Not Found 🔌❌ | No product found with id '${productId}'`)
      } catch (error) {
        console.log(error)
      }
    } else {
      this.products = this.products.filter((productId) => productId != productFinded);
      await this.saveProducts()
      console.log(`Product deleted successfully ✅ | ProductId: ${productFinded.id}`);
    }
  }

  async updateProduct(productId, product) {
    await this.loadProducts()
    const productFinded = await this.products.find(p => p.id === productId)
    if (!productFinded) {
      try {
        throw new Error(`Not Found 🔌❌ | No product found with id '${productId}'`)
      } catch (error) {
        console.log(error)
      }
    } else {
      const updatedProduct = {
        ...productFinded,
        title: product.title || productFinded.title,
        description: product.description || productFinded.description,
        price: product.price || productFinded.price,
        thumbnail: product.thumbnail || productFinded.thumbnail,
        code: product.code || productFinded.code,
        stock: product.stock || productFinded.stock,
      }
      this.products = this.products.filter((productId) => productId != productFinded)
      this.products.push(updatedProduct)
      await this.saveProducts()
      console.log(`Product updated successfully ✅ | ProductId: ${updatedProduct.id}`);
    }
  }
}

function validateParameters(product) {
  const requiredParameters = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
  return (requiredParameters.every((parameter) => Object.keys(product).includes(parameter)))
}
