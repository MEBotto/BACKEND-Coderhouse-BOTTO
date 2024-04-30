import userModel from "../../../models/user.model.js";

export default class UserDAO {
  constructor() {}
  getAll = async (limit, page, query) => {
    let limitFilter = limit || 10;
    let pageFilter = page || 1;
    let queryFilter = query || "";

    let userPaginate = await userModel.paginate(
      {
        $or: [
          { first_name: { $regex: new RegExp(queryFilter, "i") } },
          { last_name: { $regex: new RegExp(queryFilter, "i") } },
        ],
      },
      {
        limit: limitFilter,
        page: pageFilter,
      }
    );

    console.log(userPaginate);

    let responseObject = {
      status: userPaginate.totalDocs > 0 ? "success" : "error",
      payload: userPaginate.docs,
      limit: userPaginate.limit,
      totalDocs: userPaginate.totalDocs,
      docsPerPage: userPaginate.docs.length,
      totalPages: userPaginate.totalPages,
      prevPage: userPaginate.prevPage,
      nextPage: userPaginate.nextPage,
      page: userPaginate.page,
      hasPrevPage: userPaginate.hasPrevPage,
      hasNextPage: userPaginate.hasNextPage,
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
