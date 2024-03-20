import { Router, response } from "express";
import ProductManager from "../ProductManager.js"

const router = Router()

const PM = new ProductManager("./src/data/productos.json")

await PM.init()

router.get("/", (request, response) => {
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

router.get("/:id", (request, response) => {
  const { id } = request.params
  try{
    const product = PM.getProductByID(Number(id))
    return response.json(product)
  }catch(error){
    return response.json({ message: error.message })
  }
})

router.post("/", async (request, response) => {
  const { title, description, price, thumbnail, code, stock, category } = request.body

  const product = ({
    title,
    description,
    price: Number(price),
    status: true,
    thumbnail,
    category,
    code,
    stock: Number(stock),
  })

  try{
    await PM.addProduct(product)
    response.json({
      status: "Producto agregado correctamente"
    })
  }catch(error){
    return response.status(400).json({error: error.message})
  }
})

router.put("/:id", async (request, response) => {
  const { id } = request.params

  try{
    const { title, description, price, thumbnail, code, stock } = request.body
    const product = ({
      id: Number(id),
      title,
      description,
      price: Number(price),
      thumbnail,
      code,
      stock: Number(stock),
    })

    await PM.updateProduct(Number(id), product)

    response.json({
      status: "Producto actualizado correctamente"
    })
  }catch(error){
    return response.json({error: error.message})
  }
})

router.delete("/:id", async (request, response) => {
  const { id } = request.params

  try {
    await PM.deleteProduct(Number(id))
    response.json({
      status: "Producto eliminado correctamente"
    })
  }catch(error){
    response.status(400).json({error: error.message});
  }
})

export default router;