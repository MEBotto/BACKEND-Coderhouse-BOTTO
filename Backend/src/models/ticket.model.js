import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: { type: String, required: true, unique: true, },
  purchaseDatetime: { type: Date, default: new Date(), },
  amount: { type: Number, required: true, },
  productsBought: { type: Array },
  purchaser: { type: String, required: true, },
});

const ticketModel = model("tickets", ticketSchema);

export { ticketModel };