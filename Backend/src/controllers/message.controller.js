import { findMessages, createMessage, updateMessage, deleteMessage } from "../services/db/message.service.js";

export const getMessagesController = async (req, res) => {
    try {
        const messages = await findMessages();
        res.status(200).json({ data: messages, message: "Messages retrieved successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const createMessageController = async (req, res) => {
    const { user, message } = req.body;
    
    try {
        const newMessage = await createMessage(user, message);
        res.status(201).json({ data: newMessage, message: "Message created successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const updateMessageController = async (req, res) => {
    const { _id } = req.params;
    const updatedMessage = req.body;

    try {
        const updated = await updateMessage(_id, updatedMessage);
        res.status(200).json({ data: updated, message: "Message updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const deleteMessageController = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedMessage = await deleteMessage(_id);
        res.status(200).json({ data: deletedMessage, message: "Message deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};
