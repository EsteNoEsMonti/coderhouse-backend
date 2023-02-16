class ProductManager {
  static products

  constructor() {
    this.products = []
  }

  getProducts() {
    return this.products
  }

  addProduct(product) {
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
        console.log(`Product added successfully ✅ | Product {id: ${product.id}, code: ${product.code}}`);
      }
    }
  }

  getProductById(productCode) {
    const productFinded = this.products.find(p => p.code === productCode)
    if (!productFinded) {
      try {
        throw new Error(`Not Found 🔌❌ | No product found with code '${productCode}'`)
      } catch (error) {
        console.log(error);
      }
    } else {
      return productFinded
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
const productManager = new ProductManager()

// Se llamará "getProducts” recién creada la instancia, debe devolver un arreglo vacío []"
console.log(productManager.getProducts())

// Se llamará al método 'addProduct” con los campos:
const newProduct = { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }
const newProduct2 = { title: 'producto prueba 2', description: 'Este es un producto prueba 2', price: 250, thumbnail: 'Sin imagen', code: 'aaa111', stock: 50 }
const newProductMissingParameters = { title: 'Product Missing Params', code: 'bbb222', stock: 15 }
const newProductRepeatedCode = { title: 'producto codigo repetido', description: 'codigo repetido', price: 500, thumbnail: 'Sin imagen', code: 'abc123', stock: 35 }

productManager.addProduct(newProduct)
productManager.addProduct(newProduct2)
productManager.addProduct(newProductMissingParameters)

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts())

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct(newProductRepeatedCode)
console.log(productManager.getProducts())

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log('--- Method getProductById 🟢 SUCCESS ')
console.log(productManager.getProductById('abc123'))
console.log('--- Method getProductById 🔴 FAILED')
console.log(productManager.getProductById('zzz999'))
