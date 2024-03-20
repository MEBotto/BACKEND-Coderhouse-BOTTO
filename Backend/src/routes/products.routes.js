import { Router } from "express";
import { getProductController, getProductByIDController, postProductController, putProductController, deleteProductController } from "../controllers/product.controller.js";
import { passportCall } from "../utils.js";

const router = Router()

router.get("/", getProductController);

router.get("/:pid", getProductByIDController);

router.post("/", postProductController);

router.put("/:id", putProductController);

router.delete("/:id", deleteProductController);

export default router;