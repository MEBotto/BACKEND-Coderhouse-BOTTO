import { getCarts, getCartByID, addCart, deleteCart } from "../services/db/cart.service.js";
import { deleteAllProductsFromCart, getProductsFromCart, purchaseCart } from "../services/db/cart.service.js";

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

export const postCartPurchase = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { email } = req.body
    // Obtener productos del carrito
    const cartProducts = await getProductsFromCart(cartId);
    // Lógica para verificar el stock y realizar la compra
    const result = await purchaseCart(cartId, cartProducts.products, email);
    console.log(result)
    // Si hay productos que no se pudieron procesar, actualizar el carrito
    if (result.failedProducts.length > 0) {
      await deleteCart(cartId);
      res.status(200).json({ 
        message: "Purchase completed with some products not processed successfully.",
        failedProducts: result.failedProducts
      });
    } else {
      // Si todos los productos se procesaron con éxito, vaciar el carrito
      await deleteCart(cartId);
      res.status(200).json({ message: "Purchase completed successfully." });
    }
  } catch (error) {
    console.error("Error in purchaseCart function:", error);
    res.status(500).json({ error, message: "Error completing the purchase." });
  }
}

export const deleteCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await deleteCart(cid);
    res.status(200).json({ data: cart, message: "Cart deleted!" });
  } catch (error){
    res.status(400).json({ error, message: "error" });
  }
};