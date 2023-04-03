import express from 'express';
import ProductManager from './manejoDeArchivos.js';


const pm = new ProductManager();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const { limit } = req.query

    const products = await pm.getProducts()
    
    const limitProduts = products.slice(0, limit)
    res.json(limitProduts)
});

app.get('/products/:pid', async (req, res) => {

    const product = await pm.getProductById(req.params.pid)
    console.log(product);
    res.json(product)

});

app.listen(8080, () => {
    console.log('Estoy escuchando el puerto 8080...');
});