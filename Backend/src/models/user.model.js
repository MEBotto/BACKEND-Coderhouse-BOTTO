import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String },
  age: { type: Number },
  password: { type: String },
  cart: { type: Array },
  registerWith: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  photo: {
    type: String,
    default: "https://i.imgur.com/6tqjCI3.png",
  },
  github_id: { type: String },
  google_id: { type: String },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $type: "string" } },
  }
);

userSchema.index(
  { github_id: 1 },
  {
    unique: true,
    partialFilterExpression: { github_id: { $exists: true, $type: "string" } },
  }
);

userSchema.index(
  { google_id: 1 },
  {
    unique: true,
    partialFilterExpression: { google_id: { $exists: true, $type: "string" } },
  }
);

const userModel = model("users", userSchema);

export default userModel;
