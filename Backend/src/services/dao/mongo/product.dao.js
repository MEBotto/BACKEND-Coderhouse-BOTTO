import { productModel } from "../../../models/product.model.js";

export default class ProductDAO {
  constructor () {}

  getProducts = async (limit = 10, page = 1, query, sort) => {
    let _query = {}
    if (query && query.includes(":")) {
      const [key, value] = query.split(":");
      _query[key] = value;
    }
    return await productModel.paginate(_query, { limit, page, sort: sort ? { price: Number(sort) } : {} });
  }
  
  getProductByID = async (_id) => {
    return await productModel.findById({ _id })
  }
  
  addProduct = async (product) => {
    return await productModel.create(product)
  }
  
  updateProduct = async (_id, updatedProduct) => {
    return await productModel.findByIdAndUpdate({ _id }, updatedProduct)
  }
  
  deleteProduct = async (_id) => {
    return await productModel.findByIdAndDelete({ _id })
  }
}