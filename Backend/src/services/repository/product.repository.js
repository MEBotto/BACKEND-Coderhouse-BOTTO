export default class ProductRepository {
  constructor (dao) {
    this.dao = dao
  }
  getAll = (limit, page, query, sort) => {
    return this.dao.getProducts(limit, page, query, sort);
  }
  getByID = (id) => {
    return this.dao.getProductByID(id);
  }
  save = (product) => {
    return this.dao.addProduct(product);
  }
  update = (id, product) => {
    return this.dao.updateProduct(id, product);
  }
  delete = (id) => {
    return this.dao.deleteProduct(id);
  }
}