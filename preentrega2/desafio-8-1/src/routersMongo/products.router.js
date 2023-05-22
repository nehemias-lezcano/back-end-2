const {Router} = require('express')
const productManager = require('../dao/mongoDb/products.mongo')
const { userModel } = require('../dao/mongoDb/model/users.model')

const router = Router()

// http://localhost:8080/api/productsMongo
router.get("/", async (req, res) => {
  console.log('log linea 9 products router mongo', req.session)
  let {first_name, last_name, age, email } = req.session
  const userData = {
    first_name,
    last_name,
    age,
    email
  }
  console.log('log linea 17 products router mongo', userData)
  const {
    limit = 12,
    page = 1,
    sort = "asc",
    title = "",
    category = "",
  } = req.query
  const products = await productManager.getAllPaginated(
    limit,
    page,
    sort,
    title,
    category
  )
  try {
    products.docs = await products.docs.map(product => {
      const {
        _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail,
      } = product
      return {
        id: _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail,
      }
    })
    const info = {
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `http://localhost:8080/api/productsMongo?page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:8080/api/productsMongo?page=${products.nextPage}`
        : null
    }
    const productsList = products.docs
    const {hasPrevPage, hasNextPage, page, prevLink, nextLink } = info
    res.render("products", {
      style: "products.css",
      productsList,
      hasPrevPage,
      hasNextPage,
      page,
      prevLink,
      nextLink,
    })
  } catch (err) {
    console.log(err.message)
    res
      .status(500)
      .send({ status: "error", error: "Error obteniendo todos los productos" })
  }
})
router.get("/:pid", async (req, res) => {
  const { pid } = req.params
  const product = await productManager.getById(pid)
  !product ? res.status(404).send(notFound) : res.status(200).send({
    status: 'success',
    payload: product
  })
})
router.get('/:pid', async (req, res) => {
  try {
    const {pid} = req.params
    let product = await productManager.getById(pid)
    res.status(200).send({
      status: 'success',
      payload: product
  })
  } catch (error) {
    console.log(error)
  }
})
router.post('/', async (req, res) => {
  try {
    const newProduct = req.body
    let result = await productManager.addProduct(newProduct)
    res.status(200).send({
      status: 'success',
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})
router.put('/:pid', async (req, res) => {
  try {
    const {pid} = req.params
    const data = req.body
    let result = await productManager.updateProduct(pid, data)
    res.status(200).send({
      status: 'success',
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})
router.delete('/:pid', async (req, res) => {
  try {
    const {pid} = req.params
    let result = await productManager.deleteById(pid)
    res.status(200).send({
      status: 'success',
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})
router.delete("/", async (req, res) => {
  try {
    const removedProducts = await productManager.deleteAll()
    !removedProducts
      ? res.status(404).send({ error: "No se pudo eliminar los productos" })
      : res.status(200).send({
        status: 'success',
        payload: removedProducts
      })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router