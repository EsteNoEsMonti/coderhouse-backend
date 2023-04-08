import { cartManager } from '../managers/CartManager.js';


export async function getCartByIdController(req, res, next) {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        res.render('cart', {
            pageTitle: 'Cart',
            cart: cart
        });
    } catch (error) {
        next(error);
    }
}

export async function getAddProductToCartController(req, res, next) {
    try {
        const cart = await cartManager.addProductInCart(req.params.cid, req.params.pid);
        console.log(cart);
        res.json(cart);
    } catch (error) {
        next(error);
    }
}
