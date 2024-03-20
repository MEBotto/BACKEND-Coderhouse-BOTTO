import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const router = Router()

router.get("/", async (req, res) => {
  try {
    const products = await productDao.getProducts();
    res.json({
      data: products,
      message: "Products list"
    })
  }
  catch (error) {
    console.log(error);
    res.json({
      error,
      message: "error"
    })
  }
})

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = await productDao.getProductByID(pid)
    res.json({
      data: product,
      message: "Product found"
    })
  }
  catch (error) {
    console.log(error);
    res.json({
      error,
      message: "error"
    })
  }
})

router.post("/", async (req, res) => {
  try { 
    const product = await productDao.addProduct(req.body);
    res.json({
      data: product,
      message: "Product created"
    })
  }
  catch (error) {
    console.log(error);
    res.json({
      error,
      message: "error"
    })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productDao.updateProduct(id, req.body);

    res.json({
      data: product,
      message: "Product updated"
    })
  }
  catch (error){
    console.log(error);
    res.json({
      error,
      message: "error"
    })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productDao.deleteProduct(id);

    res.json({
      data: product,
      message: "Product deleted"
    })
  }
  catch (error){
    console.log(error);
    return res.json({
      error,
      message: "error"
    })
  }
})

export default router;