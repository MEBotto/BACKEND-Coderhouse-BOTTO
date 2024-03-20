import { productModel } from "../../models/product.model.js";

class ProductDao {
  async getProducts() {
    return await productModel.find()
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