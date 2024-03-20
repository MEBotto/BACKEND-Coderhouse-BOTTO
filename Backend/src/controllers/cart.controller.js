import { getCarts, getCartByID, addCart, deleteCart } from "../services/db/cart.service.js";

export const getCartController = async (req, res) => {
  try {
    const carts = await getCarts();
    res.status(200).json({ data: carts, message: "Carts list" })
  }
  catch(error) {
    res.status(400).json({ error, message: "Error" });
  }
};

export const getCartByIDController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByID(cid);
    res.status(200).json({ data: cart, message: "Cart found!" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
};

export const postCartController = async (req, res) => {
  try { 
    const cart = await addCart(req.body);
    res.status(200).json({ data: cart, message: "Cart created!" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await deleteCart(cid);
    res.status(200).json({ data: cart, message: "Cart deleted!" });
  } catch (error){
    res.status(400).json({ error, message: "error" });
  }
};