import userModel from "../../../models/user.model.js";

export default class UserDAO {
  constructor() {}
  getAll = async () => {
    return await userModel.find();
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
