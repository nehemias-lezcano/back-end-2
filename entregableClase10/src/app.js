import express from 'express';
import productRouter from '../src/routers/products.router.js';
import routerCar from './routers/carts.router.js';
import handlebars from 'express-handlebars'
import __dirname from './utils/dirname.js';
// import usersRouter from '../src/routers/views.router.js';
import ProductManager from './DAO/productManager.js';
//__________________________________________________________________________________

const pm = new ProductManager();

import {Server} from 'socket.io';
const app = express()

const httpServer = app.listen(8080, () => {
    // console.log(__dirname)
    console.log('Estoy escuchando el puerto 8080');
});

const socketServer = new Server(httpServer)

app.use('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})

socketServer.on('connection', async socket => {
    console.log('Client connection');
    const data =  await pm.getProducts()
    // console.log(data);
    socket.emit('products', {data, style: 'index.css'})

    socket.on('product', async data => {
        
        try{
            const {
            title,
            description,
            price,
            status,
            category,
            thumbnail,
            code,
            stock
        } = data
        console.log(data, 'evaluando stock');

        const valueReturned = await pm.addProduct(title, description, price, status,category, thumbnail, code, stock)
        console.log(valueReturned)
        }
        catch (err){
            console.log(err);
        }
        
        // console.log(data)
})
})




//__________________________________________________________________________________





// hbs --------------------------------------------------

app.engine('handlebars', handlebars.engine()) // Con esto iniciamos nuestro motor de plantillas
app.set('views', __dirname+'/views') // Con esto decimos donde buscar las plantillas
app.set('view engine', 'handlebars') 
// Con esto cerramos la configuración
// hbs --------------------------------------------------

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/static',express.static('./src/public'));
// ---------------------------------------------------------




// Router de carritos
app.use('/api/carts', routerCar)

// Router de productos
app.use('/api/products', productRouter)
app.use('/', productRouter)

// app.use('/', usersRouter)



