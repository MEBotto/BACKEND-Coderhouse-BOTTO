export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    return await this.dao.getAll();
  }

  getAccountById = async (id) => {
    return await this.dao.getAccountById(id);
  }

  getAccountByEmail = async (email) => {
    return await this.dao.getAccountByEmail(email);
  };

  updateAccount = async (id, account) => {
    return await this.dao.updateAccount(id, account);
  };

  deleteAccount = async (id) => {
    return await this.dao.deleteAccount(id);
  };
}
