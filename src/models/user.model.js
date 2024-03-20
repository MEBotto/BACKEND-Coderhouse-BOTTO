import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name : String,
  email: { type:String, unique:true, required: true },
  age: Number,
  password:String,
  loggedBy: String,
  cart: { type: Array },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
})

const userModel = model("users", userSchema)

export default userModel