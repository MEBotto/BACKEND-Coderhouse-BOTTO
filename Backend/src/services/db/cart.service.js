import { productModel } from "./models/product.model.js";
import { cartModel } from "./models/cart.model.js";
import { ticketModel } from "./models/ticket.model.js";
import { ObjectId } from "mongodb";

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

export const purchaseCart = async (cartId, cartProducts, purchaserEmail) => {
  try {
    const failedProducts = [];
    let totalAmount = 0;

    // Recorre los productos en el carrito y verifica el stock
    for (const cartProduct of cartProducts) {
      const productIdObject = cartProduct._id;
      const productId = productIdObject.toString()
      const requestedQuantity = cartProduct.quantity;
      console.log(productId)
      const product = await productModel.findById(productId);
      console.log(product)

      // Verifica si hay suficiente stock
      if (product.stock >= requestedQuantity) {
        // Calcula el monto total
        totalAmount += product.price * requestedQuantity;

        // Resta la cantidad del stock del producto
        product.stock -= requestedQuantity;
        await product.save();
      } else {
        // Si no hay suficiente stock, agrega el producto a la lista de productos fallidos
        failedProducts.push({ productId, requestedQuantity });
      }
    }

    // Si se compraron productos, crea un ticket
    if (totalAmount > 0) {
      const ticketData = {
        amount: totalAmount,
        purchaser: purchaserEmail,
      };

      const ticket = await ticketModel.create(ticketData);

      // Aquí puedes agregar lógica adicional para asociar el ticket al usuario, etc.

      return { failedProducts, ticketId: ticket._id };
    } else {
      // Si no se compraron productos, solo devuelve los productos fallidos
      return { failedProducts };
    }
  } catch (error) {
    // Manejo de errores, puedes lanzar una excepción o retornar un objeto de error
    console.log("Error in purchaseCart function:", error);
    throw new Error("Error processing the purchase.", error);
  }
};
