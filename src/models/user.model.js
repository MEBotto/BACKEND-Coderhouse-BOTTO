import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name : String,
  email:{
    type:String,
    unique:true
  },
  age: Number,
  password:String
})

const userModel = model("users", userSchema)

export default userModel