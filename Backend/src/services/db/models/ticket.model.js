import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new Schema({
  code: { type: String, default: () => uuidv4(), required: true, unique: true, },
  purchase_datetime: { type: Date, default: Date.now, },
  amount: { type: Number, required: true, },
  purchaser: { type: String, required: true, },
});

const ticketModel = model("tickets", ticketSchema);

export { ticketModel };