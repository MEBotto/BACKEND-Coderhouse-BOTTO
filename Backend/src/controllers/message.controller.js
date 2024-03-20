import { messageService } from "../services/factory.js";

export const getMessagesController = async (req, res) => {
    try {
        const messages = await messageService.getAll();
        res.status(200).json({ data: messages, message: "Messages retrieved successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const createMessageController = async (req, res) => {
    const { user, message } = req.body;
    
    try {
        const newMessage = await messageService.save(user, message);
        res.status(201).json({ data: newMessage, message: "Message created successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const updateMessageController = async (req, res) => {
    const { _id } = req.params;
    const updatedMessage = req.body;

    try {
        const updated = await messageService.update(_id, updatedMessage);
        res.status(200).json({ data: updated, message: "Message updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const deleteMessageController = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedMessage = await messageService.delete(_id);
        res.status(200).json({ data: deletedMessage, message: "Message deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};
