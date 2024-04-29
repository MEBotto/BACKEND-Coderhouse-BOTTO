export default class AuthRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createAccount = async (account) => {
    return await this.dao.createAccount(account);
  };

  getAccountByGitHubId = async (github_id) => {
    return await this.dao.getAccountByGitHubId(github_id);
  };

  getAccountByGoogleId = async (google_id) => {
    return await this.dao.getAccountByGoogleId(google_id);
  };

  updatePassword = async (email, password) => {
    return await this.dao.updatePassword(email, password);
  };
}
