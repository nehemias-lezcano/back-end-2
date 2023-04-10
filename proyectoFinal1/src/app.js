import express from 'express';
import productRouter from '../src/routers/products.router.js';
import routerCar from './routers/carts.router.js';
// apuntes8\proyectoFinal1\src\routers\products.router.js
// const express = require('express');
// const productRouter = require('./routers/products.router')
// import ProductManager from './DAO/productManager.js'

// const pm = new ProductManager()



const app = express()

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/static',express.static('./src/public'));

// Router de carritos
app.use('/api/carts', routerCar)

// Router de productos
app.use('/api/products', productRouter)


app.listen(8080, () => {
    console.log('Estoy escuchando el puerto 8080');
});
