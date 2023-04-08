import { Product } from '../classes/Product.js';
import { productManager } from '../managers/ProductManager.js';

export async function postCreateProductController(req, res, next) {
    try {
        const product = await new Product(req.body);
        const result = await productManager.save(product.getData());
        console.log('result -> ', result);

        req['io'].sockets.emit('products', await productManager.getAllProducts());

        res.send(result);
    } catch (error) {
        next(error);
    }
}
