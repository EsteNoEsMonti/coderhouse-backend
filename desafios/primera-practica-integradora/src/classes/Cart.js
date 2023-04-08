export class Cart {
  constructor({ id, products = [] }) {
      if (!id) throw new Error('Contructor Cart error: An argument is missing')

      this.id = id
      this.products = products
  }
}

export class CartProduct {
  constructor({ id, quantity }
  ) {
    this.id = id
    this.quantity = quantity ?? 1
  }
}