import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: new Date()}
});

messageSchema.pre("findOne", function () {
    this.populate("user");
});

const messageModel = model("messages", messageSchema);

export { messageModel };