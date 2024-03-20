import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async(req, res) => {
  try {
      const carts = await cartDao.getCarts();
      res.json({
          data: carts,
          message: "Carts list"
      })
  }
  catch(error) {
      res.json({
          error,
          message: "Error"
      });
  }
})

router.post("/", async(req, res) => {
  try {
    const cart = await cartDao.addCart(req.body);
    res.json({
      data: cart,
      message: "Cart created"
    })
  }
  catch(error) {
    res.json({
      error,
      message: "Error"
    })
  }
})

router.get("/:cid", async(req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartDao.getCartByID(cid)
    res.json({
      data: cart,
      message: `Cart with id: ${cid}`
    })
  }
  catch(error) {
    res.json({
      error,
      message: "Error"
    })
  }
})

router.put("/:cid", async(req, res) => {
  try {
    const { id } = req.params
    const { products } = req.body
    const cart = await cartDao.updateCartWithProducts(id, products);
    res.json({
      data: cart,
      message: "Cart updated"
    })
  }
  catch(error) {
    console.log(error)
    res.status(500).json({
      error,
      message: "Error"
    });
  }
})

router.delete("/:cid", async(req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartDao.deleteAllProductsFromCart(id);
    res.json({
      data: cart,
      message: "Products deleted"
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      error,
      message: error.message
    });
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
      const result = await cartDao.addProductCart(cid, pid);
      res.json({
          result,
          message: "Product added"
      });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})

router.put('/:cid/products/:pid', async (req,res)=>{
  const { cid, pid } = req.params
  const { quantity } = req.body
  try {
    const result = await cartDao.updateProductQuantity(cid, pid, quantity)
    res.json({
        result,
        message: "Product updated"
    });
  } catch (error) {
    res.status(500).json({ error: error.message })
  } 
})

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params
  try {
    const result = await cartDao.deleteProductFromCart(cid, pid)
    res.json({
      result,
      message: "Product deleted"
  })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router;