import { productModel } from "../../../models/product.model.js";
import logger from "../../../utils/logger.js";

export default class ProductDAO {
  constructor() {}

  addProduct = async (product) => {
    try {
      return await productModel.create(product);
    } catch (error) {
      throw new Error("Product not created");
    }
  };

  getProducts = async (limit, page, query, sort) => {
    try {
      let limitFilter = limit || 10;
      let pageFilter = page || 1;
      let queryFilter = query || "";
      let sortFilter = sort || "asc";
  
      let filterOptions = {};
      if (queryFilter) {
        filterOptions.category = queryFilter;
      }
  
      let sortOptions = { title: sortFilter };
  
      let productPaginate = await productModel.paginate(filterOptions, {
        limit: limitFilter,
        page: pageFilter,
        sort: sortOptions,
      });
  
      let responseObject = {
        status: productPaginate.totalDocs > 0 ? "success" : "error",
        payload: productPaginate.docs,
        limit: productPaginate.limit,
        totalDocs: productPaginate.totalDocs,
        docsPerPage: productPaginate.docs.length,
        totalPages: productPaginate.totalPages,
        prevPage: productPaginate.prevPage,
        nextPage: productPaginate.nextPage,
        page: productPaginate.page,
        hasPrevPage: productPaginate.hasPrevPage,
        hasNextPage: productPaginate.hasNextPage,
      };
  
      return responseObject;
    } catch (error) {
      logger.error("Error fetching products:", error);
      throw new Error("Error fetching products");
    }
  };  

  getProductById = async (id) => {
    const productSelected = await productModel.findById(id).lean();
    if (productSelected !== null) {
      return productSelected;
    } else {
      throw new Error("Product not found");
    }
  };

  updateProduct = async (id, product) => {
    return await productModel.updateOne({ _id: id }, product);
  };

  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id });
  };
}
