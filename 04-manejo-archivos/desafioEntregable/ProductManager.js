import fs from 'fs/promises'

class ProductManager {
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
    console.log(this.products);
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
      try {
        throw new Error(`Not Found 🔌❌ | No product found with id '${productId}'`)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(productFinded)
      // return productFinded
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

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
  }
}

function validateParameters(product) {
  const requiredParameters = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
  return (requiredParameters.every((parameter) => Object.keys(product).includes(parameter)))
}

// DESAFÍO ENTREGABLE - PROCESO DE TESTING -------------------------------------------------------------------

// Se creará una instancia de la clase 'ProductManager”
const productManager = new ProductManager('./products.txt')

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
await productManager.getProducts()

// Se llamará al método “addProduct” con los campos:
const newProduct = { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }
const newProduct2 = { title: 'producto prueba 2', description: 'Este es un producto prueba 2', price: 200, thumbnail: 'Sin imagen', code: 'bbb222', stock: 25 }
await productManager.addProduct(newProduct)
await productManager.addProduct(newProduct2)
await productManager.getProducts()

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
console.log('--- Method getProductById 🟢 SUCCESS ')
await productManager.getProductById(0)
console.log('--- Method getProductById 🔴 FAILED')
await productManager.getProductById(99)

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
const productToUpdate = { title: 'UPDATED TITLE!', price: 400, stock: 50 }
await productManager.updateProduct(0, productToUpdate)
await productManager.getProducts()

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir
console.log('--- Method deleteProduct 🟢 SUCCESS ')
await productManager.deleteProduct(1)
console.log('--- Method deleteProduct 🔴 FAILED')
await productManager.deleteProduct(99)
productManager.getProducts()
