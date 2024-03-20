import { cartService } from "../services/factory.js";

export const getProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartService.productsFromCart(cid);
    res.status(200).json({ data: products, message: `Products list from cart: ${cid}` });
  } catch (error) {
    res.status(400).json({ error, message: "Error" });
  } 
};

export const postProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = cartService.saveProductInCart(cid, pid);
    res.status(200).json({ data: cart, message: `Product ${pid} was successfully added to cart ${cid}` });
  } catch (error) {
    res.status(400).json({ error, message: "Error" });
  }
};

export const putProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = cartService.updateProductQuantity(cid, pid, quantity);
    res.status(200).json({ data: cart.data, message: `The quantity of product ${pid} in cart ${cid} has been updated to ${quantity}` });
  } catch (error) {
    res.status(400).json({ error, message: "Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = cartService.deleteProductFromCart(cid, pid);
    res.status(200).json({ data: cart, message: `Product ${pid} was successfully deleted from cart ${cid}` });
  } catch (error) {
    res.status(400).json({ error, message: "Error" });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = cartService.deleteAllProducts(cid);
    res.status(200).json({ data: cart, message: `Products in cart ${cid} were successfully deleted` });
  } catch (error) {
    res.status(400).json({ error, message: "Error" });
  }
};