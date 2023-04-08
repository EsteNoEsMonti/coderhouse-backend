import { productManager } from '../managers/ProductManager.js';


export async function getAllProductsController(req, res, next) {
    try {
        const products = await productManager.getAllProducts();
        res.render('products', {
            pageTitle: 'Products',
            thereAreProducts: products.length > 0,
            products: products
        });
    } catch (error) {
        next(error);
    }
}
export async function getProductByIdController(req, res, next) {
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.render('product', {
            pageTitle: 'Product',
            product: product
        });
    } catch (error) {
        next(error);
    }
}
