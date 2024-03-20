import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PM = new ProductManager("./src/productos.json")
PM.init()

app.get("/", (request, response) => {
  response.send("<h1>Hola mundo desde express</h1>")
})

app.get("/products", (request, response) => {
  const { limit } = request.query
  const products = PM.getProducts()

  if(limit > products.length){
    return response.json({ message :"El limite ingresado es mayor a la cantidad de productos" })
  }
  if(limit){
    const limitOptions = products.slice(0, limit)
    return response.json(limitOptions)
  }

  return response.json(products)
})

app.get("/products/:id", (request, response) => {
  const { id } = request.params
  try{
    const product = PM.getProductByID(Number(id))
    return response.json(product)
  }catch(error){
    return response.json({ message: error.message })
  }
})

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})