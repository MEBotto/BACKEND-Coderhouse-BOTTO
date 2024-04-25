import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, default: new Date().toLocaleString()}
});

const messageModel = model("messages", messageSchema);

export { messageModel };