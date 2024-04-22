import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  title: { type: String, required: true },
  volume: { type: Number, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Comics", "Manga", "Fantasy", "Romance", "Other"],
  },
  status: { type: Boolean, required: true },
  owner: { type: String, default: "admin" },
  upload_date: { type: Date, default: new Date() },
  publication_date: { type: Date, default: new Date() },
});

productSchema.plugin(mongoosePaginate);

const productModel = model("products", productSchema);

export { productModel };