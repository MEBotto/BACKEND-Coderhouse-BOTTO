import { productModel } from "../../models/product.model.js";

class ProductDao {
  //limit = 10, page = 1, query, sort
  async getProducts(limit = 10, page = 1, query, sort) {
    let _query = {}
    if(query != undefined){
      _query[query.split(":")[0]] = query.split(":")[1]
    }
    return await productModel.paginate(_query, {limit: limit, page: page, sort: sort == undefined ? {} : {price: Number(sort)}})
  }

  async getProductByID(_id) {
    return await productModel.findById({ _id })
  }

  async addProduct(product) {
    return await productModel.create(product)
  }

  async updateProduct(_id, updatedProduct) {
    return await productModel.findByIdAndUpdate({ _id }, updatedProduct)
  }

  async deleteProduct(_id) {
    return await productModel.findByIdAndDelete({ _id })
  }
}

export default new ProductDao()