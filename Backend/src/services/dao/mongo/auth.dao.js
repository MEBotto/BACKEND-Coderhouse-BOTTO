import userModel from "../../../models/user.model.js";

export default class AuthDAO {
  constructor() {}
  createAccount = async (user) => {
    return await userModel.create(user);
  };
  getAccountByGitHubId = async (github_id) => {
    return await userModel.findOne({ github_id: github_id });
  };
  getAccountByGoogleId = async (google_id) => {
    return await userModel.findOne({ google_id: google_id });
  };
  updatePassword = async (email, password) => {
    return await userModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );
  };
}
