export default class CartRepository {
  constructor (dao) {
    this.dao = dao
  }
  getAll = () => {
    return this.dao.getCarts();
  }
  getByID = (id) => {
    return this.dao.getCartByID(id);
  }
  save = (cart) => {
    return this.dao.addCart(cart);
  }
  delete = (id) => {
    return this.dao.deleteCart(id);
  }
  productsFromCart = (id) => {
    return this.dao.getProductsFromCart(id);
  }
  saveProductInCart = (cid, pid) => {
    return this.dao.addProductToCart(cid, pid);
  }
  updateProductQuantity = (cid, pid, quantity) => {
    return this.dao.updateProductQuantity(cid, pid, quantity);
  }
  deleteProductFromCart = (cid, pid) => {
    return this.dao.deleteProductFromCart(cid, pid);
  }
  deleteAllProducts = (id) => {
    return this.dao.deleteAllProductsFromCart(id);
  }
  purchase = (id, products, email) => {
    return this.dao.purchaseCart(id, products, email);
  }
}