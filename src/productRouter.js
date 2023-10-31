const express = require('express');
const productRouter = express.Router();

module.exports = (productManager) => {
    // Endpoint para obtener todos los productos
    productRouter.get('/', async (req, res) => {
        const limit = req.query.limit;
        try {
            const products = await productManager.getProducts(limit);
            res.json(products);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });

    // Endpoint para obtener un producto por su ID
    productRouter.get('/:pid', async (req, res) => {
        const productId = parseInt(req.params.pid);
        try {
            const product = await productManager.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });

    // Endpoint para agregar un nuevo producto
    productRouter.post('/', (req, res) => {
        try {
            const newProduct = req.body;
            productManager.addProduct(newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // Endpoint para actualizar un producto por su ID
    productRouter.put('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        try {
            const updatedProduct = req.body;
            productManager.updateProduct(productId, updatedProduct);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });

    // Endpoint para eliminar un producto por su ID
    productRouter.delete('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        try {
            productManager.deleteProduct(productId);
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });

    return productRouter;
};
