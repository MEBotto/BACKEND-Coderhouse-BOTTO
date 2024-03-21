import { cartService } from "../services/factory.js";
import sendMail from "../utils/nodeMailer.js";

const getCartByUserIdController = async (req, res) => {
  const { uid } = req.params;

  try {
    const cartSelected = await cartService.getCartByUserId(uid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const createCartController = async (req, res) => {
  const { userId } = req.body;
  const newCart = await cartService.createCart(userId);
  res
    .status(200)
    .json({ message: "Successfully created!", cartCreated: newCart });
};

const getCartByCartIdController = async (req, res) => {
  const { cid } = req.params;

  try {
    const cartSelected = await cartService.getCartByCartId(cid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const updateCartController = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  const productMap = products.map((p) => {
    return {
      productId: p,
      quantity: 1,
    };
  });

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({
      error: "Please send an array of products to create your cart.",
    });
  }

  try {
    await cartService.updateCart(cid, productMap);
    res.status(200).json({ message: "Product updated successuflly" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const cleanCartByCartIdController = async (req, res) => {
  const { cid } = req.params;

  try {
    await cartService.cleanCartByCartId(cid);
    res.status(200).json({ message: "Cart empty successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const addProductByCartIdController = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartService.addProductByCartId(cid, pid);
    res.status(200).json({ message: "New product has added!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const postPaymentController = async (req, res) => {
  const { cid } = req.params;

  try {
    let result = await cartService.postPayment(cid);

    if (result.ticket !== null) {
      sendMail
      res.status(200).json({
        message: "Payment successufully, email sended",
        productsBuy: result.productBought,
        ticket: result.ticket,
        productsLeft: result.nonShopProducts,
        hasNewCart: result.hasNewCart,
        buyCart: result.buyCart,
      });
    } else {
      res.status(404).json({
        message: "Payment failed",
        productsBuy: result.productBought,
        ticket: result.ticket,
        productsLeft: result.nonShopProducts,
        hasNewCart: result.hasNewCart,
        buyCart: result.buyCart,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateQuantityProductController = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await cartService.updateQuantityProduct(cid, pid, quantity);
    res.status(200).json({ message: "Quantity successufully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductByCartIdController = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartService.deleteProductByCartId(cid, pid);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export {
  getCartByUserIdController,
  createCartController,
  getCartByCartIdController,
  updateCartController,
  cleanCartByCartIdController,
  addProductByCartIdController,
  postPaymentController,
  updateQuantityProductController,
  deleteProductByCartIdController,
};
