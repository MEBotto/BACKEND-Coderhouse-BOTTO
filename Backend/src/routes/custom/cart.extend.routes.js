import CustomRouter from "./custom.routes.js";
import { getProducts, postProductToCart, putProductQuantity, deleteProduct, deleteAllProducts } from "../../controllers/cart.product.controller.js";

export default class CartExtendRouter extends CustomRouter {
  init(){
    this.get("/:cid/products/", ["USER", "USER_PREMIUN"], getProducts)

    this.post("/:cid/product/:pid", ["USER", "USER_PREMIUN"], postProductToCart)

    this.put('/:cid/product/:pid', ["USER", "USER_PREMIUN"], putProductQuantity)

    this.delete("/:cid/product/:pid", ["USER", "USER_PREMIUN"], deleteProduct)

    this.delete("/:cid/products/", ["USER", "USER_PREMIUN"], deleteAllProducts)
  }
}