import userModel from "../../../models/user.model.js";

export default class UserDAO {
  constructor() {}
  getAll = async (limit, page, query) => {
    let limitFilter = limit || 10;
    let pageFilter = page || 1;
    let queryFilter = query || "";

    let userPaginate = await userModel.paginate(
      { name: { $regex: new RegExp(queryFilter, "i") } },
      {
        limit: limitFilter,
        page: pageFilter,
      }
    );

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
  getAccountById = async (id) => {
    return await userModel.findOne({ _id: id });
  };
  getAccountByEmail = async (email) => {
    return await userModel.findOne({ email: email });
  };
  updateAccount = async (id, account) => {
    return await userModel.findByIdAndUpdate(id, account);
  };
  deleteAccount = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
}
