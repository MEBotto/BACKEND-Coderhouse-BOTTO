import { Router } from "express";
import {
  getCartByUserIdController,
  createCartController,
  getCartByCartIdController,
  updateCartController,
  cleanCartByCartIdController,
  addProductByCartIdController,
  postPaymentController,
  updateQuantityProductController,
  deleteProductByCartIdController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/user/:uid", getCartByUserIdController);

cartRouter.post("/", createCartController);

cartRouter.get("/:cid", getCartByCartIdController);

cartRouter.put("/:cid", updateCartController);

cartRouter.delete("/:cid", cleanCartByCartIdController);

cartRouter.post("/:cid/product/:pid", addProductByCartIdController);

cartRouter.post("/:cid/purchase", postPaymentController);

cartRouter.put("/:cid/products/:pid", updateQuantityProductController);

cartRouter.delete("/:cid/products/:pid", deleteProductByCartIdController);

export default cartRouter;