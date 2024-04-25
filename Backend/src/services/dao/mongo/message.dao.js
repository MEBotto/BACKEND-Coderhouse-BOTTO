import { messageModel } from "../../../models/message.model.js";

export default class MessageDAO {
  constructor() {}

  findMessages = async () => {
    try {
      const messages = await messageModel.find().lean().populate("user");
      return messages;
    } catch (error) {
      console.error("Error finding messages:", error);
      throw error;
    }
  };

  createMessage = async (user, message, timestamp) => {
    try {
      const newMessage = new messageModel({ user, message, timestamp });
      await newMessage.save();
      return await messageModel.findById(newMessage._id).populate("user");
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

  updateMessage = async (_id, updatedMessage) => {
    try {
      const updated = await messageModel.findByIdAndUpdate(
        _id,
        updatedMessage,
        { new: true }
      );
      return updated;
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  };

  deleteMessage = async (_id) => {
    try {
      const deletedMessage = await messageModel.findByIdAndDelete(_id);
      return deletedMessage;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  };
}
