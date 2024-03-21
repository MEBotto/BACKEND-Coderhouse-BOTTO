import { emailModel } from "../../../models/email.model.js";

export default class EmailDAO {
  constructor(){}

  getEmail = async (token) => {
    return await emailModel.findOne({ tokenId: token })
  }

  createEmail = async (email) => {
    return await emailModel.create(email);
  };

  deleteToken = async (token) => {
    return await emailModel.deleteOne({ tokenId: token });
  };
}