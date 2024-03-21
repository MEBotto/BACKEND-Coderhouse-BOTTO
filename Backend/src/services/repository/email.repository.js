export default class EmailRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getEmail = async (token) => {
    return await this.dao.getEmail(token);
  };

  createEmail = async (email) => {
    return await this.dao.createEmail(email);
  };

  deleteToken = async (token) => {
    return await this.dao.deleteToken(token);
  };
}