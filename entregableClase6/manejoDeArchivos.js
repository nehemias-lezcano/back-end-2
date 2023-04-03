// const fs = require('fs');
import { log } from 'console';
import fs from 'fs';

class ProductManager {
    /*
    agregar, consultar, modificar 
    y eliminar un producto y manejarlo en persistencia de archivos 
    */
    constructor() {
        this.products = [];
        this.path = './productos.json';
    }


    __appendProduct = async () => {

        const toJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, toJSON)
    };

    addProduct(title, description, price, thumbnail, code, stock) {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        // ID Autoincremental
        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        // Verifica que el objeto tenga todos sus valores
        if (Object.values(product).every(value => value)) {
            this.products.push(product);
            this.__appendProduct()

        } else {
            return console.log("Todos los campos son obligatorios");
        }

    }

    getProducts = async () => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            
            return JSON.parse(getFileProducts)
        } catch {
            return 'No se puede leer el archivo'
        }

    }

    getProductById = async (id) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const parseProducst = JSON.parse(getFileProducts);
            console.log(parseProducst[id - 1]);
            if (!parseProducst[id - 1]) return 'Error! No existe'
            console.log(parseProducst[id - 1]);
            return parseProducst[id - 1]
        }
        catch (err) {
            return err
        }
    }



    updateProduct = async (id, data) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);

        const returnedTarget = Object.assign(parseProducts[id - 1], data);

        parseProducts[id - 1] = returnedTarget;

        this.products = parseProducts
        this.__appendProduct()

    }

    deleteProduct = async (id) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);

        parseProducts.splice(id - 1, 1);
        this.products = parseProducts;
        this.__appendProduct();
    }
};

// const instancia = new ProductManager();
// instancia.addProduct('Cs 1.5','Servidor de calidad media cs 1.5', 500, 'thumnbail', 123465, 15);
// instancia.addProduct('Cs 1.6','Servidor de calidad media cs 1.6', 500, 'thumnbail', 123465, 15);
// instancia.addProduct('Cs 1.3','Servidor de calidad media cs 1.4', 500, 'thumnbail', 123465, 15);

// // console.log(instancia.products);
// console.log(instancia.getProductById(2))
// console.log(instancia.getProductById(4))

// instancia.getProducts()
// // instancia.getProductById(4);
// // instancia.updateProduct(1, {
// //     "title": "AOE2",
// //     "description": "Juego de estrategia",
// //     "price": 500,
// //     "thumbnail": "imagen",
// //     "code": 123465,
// //     "stock": 15,
// //   })
// // instancia.deleteProduct(3)

export default ProductManager

// console.log('Hola')