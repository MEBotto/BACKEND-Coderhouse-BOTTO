import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import { checkUserRole } from "../middlewares/hasPermissionsMiddleware.js";
import { uploadToCloudinary } from "../middlewares/multerMiddleware.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getProductsController);

productRouter.get("/:pid", getProductByIdController);

productRouter.post(
  "/",
  checkUserRole(["ADMIN", "PREMIUM"]),
  uploadToCloudinary("thumbnail", "single"),
  addProductController
);

productRouter.put(
  "/:pid",
  checkUserRole(["ADMIN", "PREMIUM"]),
  uploadToCloudinary("", "any"),
  updateProductController
);

productRouter.delete(
  "/:pid",
  checkUserRole(["ADMIN", "PREMIUM"]),
  deleteProductController
);

export default productRouter;
