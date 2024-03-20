import { messageModel } from "./models/message.model.js";

export const findMessages = async () => {
    try {
        const messages = await messageModel.find();
        return messages;
    } catch (error) {
        console.error("Error finding messages:", error);
        throw error;
    }
}

export const createMessage = async (user, message) => {
    try {
        const newMessage = await messageModel.create({ user, message });
        return newMessage;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
}

export const updateMessage = async (_id, updatedMessage) => {
    try {
        const updated = await messageModel.findByIdAndUpdate(_id, updatedMessage, { new: true });
        return updated;
    } catch (error) {
        console.error("Error updating message:", error);
        throw error;
    }
}

export const deleteMessage = async (_id) => {
    try {
        const deletedMessage = await messageModel.findByIdAndDelete(_id);
        return deletedMessage;
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
}
