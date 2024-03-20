import { messageModel } from "../../models/message.model.js";

class MessageDao {
  async findMessages() {
      return await messageModel.find();
  }

  async createMessage(user, message) {
      return await messageModel.create({user, message});
  }

  async updateMessage(_id, message) {
      return await messageModel.findByIdAndUpdate({ _id }, message);
  }

  async deleteMessage(_id) {
      return await messageModel.findByIdAndDelete({ _id });
  }
}

export default new MessageDao();