import { Router } from "express";
import { getCartController, getCartByIDController, postCartController, postCartPurchase, deleteCartController } from "../controllers/cart.controller.js";


const router = Router();

//cart.controller
router.get("/", getCartController)

router.get("/:cid", getCartByIDController)

router.post("/", postCartController)

router.post("/:cid/purchase", postCartPurchase)

router.delete("/:cid", deleteCartController)

export default router;