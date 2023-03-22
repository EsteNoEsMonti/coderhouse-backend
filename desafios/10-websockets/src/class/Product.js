export class Product {
  constructor({ id, title, description, code, price, status = true, stock, category, thumbnails }) {
      if (!id) throw new Error('Contructor Product error: An argument is missing')
      if (!title) throw new Error('Contructor Product error: An argument is missing')
      if (!description) throw new Error('Contructor Product error: An argument is missing')
      if (!code) throw new Error('Contructor Product error: An argument is missing')
      if (!price) throw new Error('Contructor Product error: An argument is missing')
      if (!stock) throw new Error('Contructor Product error: An argument is missing')
      if (!category) throw new Error('Contructor Product error: An argument is missing')

      this.id = id
      this.title = title
      this.description = description
      this.code = code
      this.price = price
      this.status = status
      this.stock = stock
      this.category = category
      this.thumbnails = thumbnails
  }
}