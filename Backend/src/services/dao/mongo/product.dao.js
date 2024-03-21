import { productModel } from "../../../models/product.model.js";

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
    let limitFilter = limit ?? 10;
    let pageFilter = page ?? 1;
    let queryFilter = query !== undefined ? query : "";
    let sortFilter;

    if (sort) {
      sortFilter = "";
    } else {
      sort === "asc" ? (sortFilter = "asc") : (sortFilter = "desc");
    }

    let productPaginate;

    // Case where queryFilter and sortFilter are passed
    if (queryFilter && sortFilter) {
      productPaginate = await productModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only sortFilter are passed
    if (!queryFilter && sortFilter) {
      productPaginate = await productModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only queryFilter are passed
    if (queryFilter && !sortFilter) {
      productPaginate = await productModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter }
      );
    }

    // Case where no queryFilter or sortFilter are passed
    if (!queryFilter && !sortFilter) {
      productPaginate = await productModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter }
      );
    }

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
