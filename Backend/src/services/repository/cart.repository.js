export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createCart = async (products, userId) => {
    return await this.dao.createCart(products, userId);
  };

  getCartByCartId = async (id) => {
    try {
      return await this.dao.getCartByCartId(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getCartByUserId = async (userId) => {
    try {
      return await this.dao.getCartByUserId(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProductByCartId = async (cartId, productId) => {
    try {
      return await this.dao.addProductByCartId(cartId, productId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  cleanCartByCartId = async (cartId, productId) => {
    try {
      return await this.dao.cleanCartByCartId(cartId, productId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateCart = async (cartId, products) => {
    try {
      return await this.dao.updateCart(cartId, products);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  postPayment = async (cartId) => {
    try {
      return await this.dao.postPayment(cartId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateQuantityProduct = async (cartId, productId, quantity) => {
    try {
      return await this.dao.updateQuantityProduct(cartId, productId, quantity);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteProductByCartId = async (cartId, productId) => {
    try {
      return await this.dao.deleteProductByCartId(cartId, productId);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}