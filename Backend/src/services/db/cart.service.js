import { productModel } from "./models/product.model.js";
import { cartModel } from "./models/cart.model.js";

//cart.controller
export const getCarts = async () => {
  return await cartModel.find();
}

export const addCart = async (cart) => {
  return await cartModel.create(cart);
}

export const getCartByID = async (_id) => {
  return await cartModel.findById(_id);
}

export const deleteCart = async (_id) => {
  return await cartModel.findByIdAndDelete(_id);
}

//cartProduct.controller
export const getProductsFromCart = async (id) => {
  return await cartModel
    .findById(id)
    .populate({
      path: 'products.product',
      model: productModel,
      select: 'title description price thumbnail code stock'
    })
    .lean();
}

export const addProductToCart = async (cartId, productId) => {
  const cart = await cartModel.findById(cartId);
  if (!cart) {
    throw new Error("Cart not found with that ID!");
  }

  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error("Product not found!");
  }

  const existingProduct = cart.products.find(p => p._id.equals(productId));
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({
      _id: productId
    });
  }

  await cart.save();
  return {message:'The products in the cart have been modified!', data: cart};
}

export const updateProductQuantity = async (cartId, productId, newQuantity) => {
  const cart = await cartModel.findById(cartId);
  if (!cart) {
    throw new Error("Cart not found!");
  }

  const product = cart.products.find(p => p._id.equals(productId));
  if (!product) {
    throw new Error("Product not found in cart!");
  }

  product.quantity = newQuantity;
  await cart.save();
  return cart;
}

export const deleteProductFromCart = async (cartId, productId) => {
  const cart = await cartModel.findById(cartId);
  if (!cart) {
    throw new Error("Cart not found!");
  }

  const initialProductCount = cart.products.length;
  cart.products = cart.products.filter(p => !p._id.equals(productId));

  if (cart.products.length === initialProductCount) {
    throw new Error('Product not found in the cart');
  }

  await cart.save();
  return cart;
}

export const deleteAllProductsFromCart = async(cartId) => {
  const cart = await cartModel.findById(cartId);
  if (!cart) {
    throw new Error("Cart not found!");
  }

  cart.products = [];
  await cart.save();
  return cart;
}