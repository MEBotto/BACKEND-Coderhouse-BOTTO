import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String },
  age: { type: Number },
  password: { type: String },
  cart: { type: Array },
  registerWith: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin", "premium"] },
  photo: {
    type: String,
    default: "https://i.imgur.com/6tqjCI3.png",
  },
  github_id: { type: String },
  google_id: { type: String },
  documents: { 
    file: { type: String },
    name: { type: String }, 
    reference: { type: String } 
  },
  last_connection: { type: Date },
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

userSchema.plugin(mongoosePaginate);

const userModel = model("users", userSchema);

export default userModel;
