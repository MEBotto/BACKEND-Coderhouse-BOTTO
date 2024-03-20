import { Router } from "express";
import { getProducts, postProductToCart, putProductQuantity, deleteProduct, deleteAllProducts } from "../controllers/cart.product.controller.js";
import { getCartController, getCartByIDController, postCartController, deleteCartController } from "../controllers/cart.controller.js";


const router = Router();

//cart.controller
router.get("/", getCartController)

router.get("/:cid", getCartByIDController)

router.post("/", postCartController)

router.delete("/:cid", deleteCartController)

//cart.product.controller
router.get("/:cid/products/", getProducts)

router.post("/:cid/product/:pid", postProductToCart)

router.put('/:cid/product/:pid', putProductQuantity)

router.delete("/:cid/product/:pid", deleteProduct)

router.delete("/:cid/products/", deleteAllProducts)

export default router;