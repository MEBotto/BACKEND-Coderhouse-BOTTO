import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import { checkUserRole } from "../middlewares/hasPermissionsMiddleware.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getProductsController);

productRouter.get("/:pid", getProductByIdController);

productRouter.post("/", checkUserRole(["ADMIN", "PREMIUN"]), addProductController);

productRouter.put("/:pid", checkUserRole(["ADMIN", "PREMIUN"]), updateProductController);

productRouter.delete("/:pid", checkUserRole(["ADMIN", "PREMIUN"]), deleteProductController);

export default productRouter;
