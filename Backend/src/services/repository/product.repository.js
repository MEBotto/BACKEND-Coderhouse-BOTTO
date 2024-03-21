export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (limit, page, sort, query) => {
    return await this.dao.getProducts(limit, page, sort, query);
  };

  addProduct = async (product) => {
    try {
      return await this.dao.addProduct(product);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProductById = async (id) => {
    return await this.dao.getProductById(id);
  };

  updateProduct = async (id, product) => {
    return await this.dao.updateProduct(id, product);
  };

  deleteProduct = async (id) => {
    return await this.dao.deleteProduct(id);
  };
}