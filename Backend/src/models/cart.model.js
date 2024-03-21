import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 },
  }],
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
})

cartSchema.pre("findOne", function () {
  this.populate("products.productId");
});

const cartModel = model("carts", cartSchema)

export { cartModel }