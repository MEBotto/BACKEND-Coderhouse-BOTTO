export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async (limit, page, query) => {
    return await this.dao.getAll(limit, page, query);
  };

  getAccountById = async (id) => {
    return await this.dao.getAccountById(id);
  };

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
