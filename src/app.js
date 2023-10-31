const express = require('express');
const ProductManager = require('./ProductManager'); // Cambio en la ruta
const CartManager = require('./CartManager'); // Nueva importación para CartManager
const app = express();
const port = 8088;

// Agregar una ruta de inicio en app.js
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación de gestión de productos y carritos!');
});
// Crear una instancia de ProductManager y CartManager
const productManager = new ProductManager('./products.json'); // Ajustar la ruta
const cartManager = new CartManager('./carts.json'); // Nueva instancia para CartManager


// Configurar middleware para manejar JSON
app.use(express.json());


// Rutas de productos
const productRouter = require('./productRouter');
app.use('/api/products', productRouter(productManager));

// Rutas de carritos
const cartRouter = require('./cartRouter');
app.use('/api/carts', cartRouter(cartManager));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
