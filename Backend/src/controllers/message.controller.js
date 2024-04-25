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
    const { user, message, timestamp } = req.body;
    
    try {
        const newMessage = await messageService.save(user, message, timestamp);
        res.status(201).json({ data: newMessage, message: "Message created successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const updateMessageController = async (req, res) => {
    const { id } = req.params;
    const updatedMessage = req.body;

    try {
        const updated = await messageService.update(id, updatedMessage);
        res.status(200).json({ data: updated, message: "Message updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};

export const deleteMessageController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMessage = await messageService.delete(id);
        res.status(200).json({ data: deletedMessage, message: "Message deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", message: error.message });
    }
};
