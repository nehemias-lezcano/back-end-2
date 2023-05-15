const {Schema, model} = require('mongoose')

const collection = 'products'

const productSchema = new Schema({
    title: String,
    description: String,
    precio: Number,
    stock: Number,
    code: {
      type: String,
      unique: true
    },
    category: String,
    thumbnail: String,
    status: Boolean
})

const productsModel = model(collection, productSchema)

module.exports = {
  productsModel
}