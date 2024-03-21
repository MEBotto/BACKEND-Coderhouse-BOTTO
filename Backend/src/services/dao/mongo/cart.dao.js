import { cartModel } from "../../../models/cart.model.js";
import { ticketModel } from "../../../models/ticket.model.js";
import { productModel } from "../../../models/product.model.js";
import { v4 as uuidv4 } from "uuid";

export default class CartDAO {
  constructor() {}

  createCart = async (userId) => {
    return await cartModel.create({
      products: [],
      userId,
    });
  };

  addProductByCartId = async (cartId, productId) => {
    const selectedCart = await this.getCartByCartId(cartId);

    if (selectedCart) {
      const productIndex = selectedCart.products.findIndex((p) => {
        return p.productId._id.toString() === productId;
      });

      if (productIndex > -1) {
        selectedCart.products[productIndex].quantity++;
      } else {
        selectedCart.products.push({ productId: productId, quantity: 1 });
      }

      await cartModel.findOneAndUpdate({ _id: cartId }, selectedCart);
    } else {
      throw new Error("Cart not found!");
    }
  };

  getCartByCartId = async (id) => {
    return await cartModel.findById(id).lean();
  };

  getCartByUserId = async (userId) => {
    return await cartModel.findOne({ userId, hasPurchased: false }).lean();
  };

  cleanCartByCartId = async (cartId) => {
    try {
      return await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: [] } }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateCart = async (cartId, products) => {
    try {
      return await cartModel.updateOne({ _id: cartId }, { $set: { products } });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  postPayment = async (cartId) => {
    let hasNewCart = false;
    let amountPurchased = 0;
    let purchasedProducts = [];
    let nonShopProducts = [];
    let newCart = null;
    let ticketCreated = false;
    let ticketUser = null;
    try {
      const productData = await this.getCartByCartId(cartId);
      console.log(productData);
      for (let i = 0; i < productData.products.length; i++) {
        if (
          productData.products[i].productId.stock >=
          productData.products[i].quantity
        ) {
          productData.products[i].productId.stock -=
            productData.products[i].quantity;
          await productModel.updateOne(
            { _id: productData.products[i].productId._id },
            { $set: { stock: productData.products[i].productId.stock } }
          );

          amountPurchased +=
            productData.products[i].productId.price *
            productData.products[i].quantity;

          purchasedProducts.push(productData.products[i]);
        } else {
          nonShopProducts.push(productData.products[i]);
        }
      }

      if (nonShopProducts.length === productData.products.length) {
        hasNewCart = false;
      } else {
        hasNewCart = true;
      }

      if (hasNewCart) {
        newCart = await cartModel.create({
          products: purchasedProducts,
          userId: productData.userId,
          hasPurchased: true,
        });

        await cartModel.updateOne(
          { _id: cartId },
          { $set: { products: nonShopProducts } }
        );

        ticketCreated = true;
      } else if (!hasNewCart && purchasedProducts.length > 0) {
        await cartModel.updateOne(
          { _id: cartId },
          { $set: { hasPurchased: true } }
        );

        ticketCreated = true;
      }

      if (ticketCreated) {
        ticketUser = await ticketModel.create({
          code: uuidv4(),
          purchaseDatetime: new Date(),
          amount: amountPurchased,
          productsBought: purchasedProducts,
          purchaser: productData.userId,
        });
      }

      const data = {
        ticket: ticketUser ? ticketUser : null,
        hasNewCart: hasNewCart,
        buyCart: hasNewCart ? newCart : null,
        productBought: purchasedProducts,
        nonShopProducts: nonShopProducts,
      };

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateQuantityProduct = async (cartId, productId, quantity) => {
    try {
      return await cartModel.updateOne(
        { _id: cartId, "products.productId": productId },
        { $set: { "products.$.quantity": quantity } }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteProductByCartId = async (cartId, productId) => {
    try {
      return await cartModel.updateOne(
        { _id: cartId },
        { $pull: { products: { productId: productId } } }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const cartDao = new CartDAO();
