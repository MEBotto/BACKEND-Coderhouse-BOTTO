import { productModel } from "../../models/product.model.js";
import { cartModel } from "../../models/cart.model.js";

class CartDao {
  async getCarts(){
    return await cartModel.find();
  }

  async addCart(cart) {
    return await cartModel.create(cart);
  }

  async updateCart(_id, cart) {
    return await cartModel.findByIdAndUpdate({ _id }, cart);
  }

  async getCartByID(_id){
    return await cartModel.findById({ _id });
  }

  async deleteCart(_id) {
    return await cartModel.findByIdAndDelete({ _id });
  }

  async addProductCart(cartId, productId) {
    // Verifica si el carrito existe
    const cart = await cartModel.findById(cartId);
    if (cart) {
      // Verifica si el producto existe en el ProductManager
      const product = await productModel.findById(productId);
      if (product) {
        try {
          // Verificar si el producto ya está en el carrito
          const existingProduct = cart.products.find(p => p._id.equals(productId));
  
          if (existingProduct) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            existingProduct.quantity += 1;
          } else {
            // Si el producto no está en el carrito, añádelo con cantidad 1
            cart.products.push({
              _id: productId,
              quantity: 1
            });
          }
          // Guardar el carrito actualizado
          await cart.save();
  
          return 'Se modificaron los productos en el carrito';
        } catch (error) {
          throw error
        }
      } else {
        throw new Error('Producto no encontrado');
      }
    } else {
      throw new Error("Carrito no encontrado con ese ID");
    }
  }
}

export default new CartDao()