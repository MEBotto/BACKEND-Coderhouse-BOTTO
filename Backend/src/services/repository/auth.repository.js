export default class AuthRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    return await this.dao.getAll();
  }

  createAccount = async (account) => {
    return await this.dao.createAccount(account);
  };

  getAccountByEmail = async (email) => {
    return await this.dao.getAccountByEmail(email);
  };

  getAccountByGitHubId = async (github_id) => {
    return await this.dao.getAccountByGitHubId(github_id);
  };

  getAccountByGoogleId = async (google_id) => {
    return await this.dao.getAccountByGoogleId(google_id);
  };

  updateAccount = async (id, account) => {
    return await this.dao.updateAccount(id, account);
  };

  deleteAccount = async (id) => {
    return await this.dao.deleteAccount(id);
  };
}
