import { Router } from "express";
import cartManager from "../managers/cart.manager";
import productManager from "./productManager";

const router = Router();

router.post('/', async(req, res) => {
    try {
        const newCart = {
            id: generateUniqueCartId(),
            products: [], 
        };
        await cartManager.createCart(newCart);

        res.json({ message: 'Carrito creado correctamente.', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito.' });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el carrito.' });
    }
});

router.post('/:idCart/product/:idProd', async(req, res) => {
    const { idProd, idCart } = req.params; 

    try {
        const cart = await cartManager.getCartById(idCart);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado.' });
        }

        const product = await productManager.getProductById(idProd);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        await cartManager.saveProductToCart(idCart, product);

        res.json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
    }
});

export default routes;
