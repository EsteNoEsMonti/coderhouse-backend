export class Cart {
  constructor({ id, products = [] }) {
      if (!id) throw new Error('Contructor Cart error: An argument is missing')

      this.id = id
      this.products = products
  }
}