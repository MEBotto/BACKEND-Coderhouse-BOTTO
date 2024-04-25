export default class MessageRepository {
  constructor (dao) {
    this.dao = dao
  }
  getAll = () => {
    return this.dao.findMessages();
  }
  save = (user, message, timestamp) => {
    return this.dao.createMessage(user, message, timestamp);
  }
  update = (id, updatedMessage) => {
    return this.dao.updateMessage(id, updatedMessage);
  }
  delete = (id) => {
    return this.dao.deleteMessage(id);
  }
}