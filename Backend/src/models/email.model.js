import { Schema, model } from "mongoose";

const emailSchema = new Schema({
  tokenId: { type: String, required: true },
  email: { type: String, required: true },
  expirationTime: { type: Date, required: true },
});

emailModel = model("recoveryEmail", emailSchema);

export { emailModel };