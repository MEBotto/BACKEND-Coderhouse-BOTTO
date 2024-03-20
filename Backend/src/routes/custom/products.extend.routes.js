import CustomRouter from "./custom.routes.js";
import { getProductController, getProductByIDController, postProductController, putProductController, deleteProductController } from "../../controllers/product.controller.js";

export default class ProductExtendRouter extends CustomRouter {
  init(){
    this.get("/", ["PUBLIC"], getProductController);

    this.get("/:pid", ["PUBLIC"], getProductByIDController);

    this.post("/", ["ADMIN"], postProductController);

    this.put("/:id", ["ADMIN"], putProductController);

    this.delete("/:id", ["ADMIN"], deleteProductController);
  }
}