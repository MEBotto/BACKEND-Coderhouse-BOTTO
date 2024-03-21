import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getProductsController);

productRouter.get("/:pid", getProductByIdController);

productRouter.post("/", addProductController);

productRouter.put("/:pid", updateProductController);

productRouter.delete("/:pid", deleteProductController);

export default productRouter;