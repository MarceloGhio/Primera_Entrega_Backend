const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 1080;

// Crear una instancia de ProductManager
const productManager = new ProductManager('products.json');

// Configurar middleware para manejar JSON
app.use(express.json());

// Definir los endpoints

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    try {
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});