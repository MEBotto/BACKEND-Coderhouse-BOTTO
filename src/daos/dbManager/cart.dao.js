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

  async getProductsFromCart(id){
    return await cartModel.findById(id).populate({path: 'products.product', model: productModel, select: 'title description price thumbnail code stock'}).lean()
  }

  async updateProductQuantity(cartId, productId, newQuantity){
    try {
      const cart = await cartModel.findById(cartId)
  
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
  
      const product = cart.products.find(p => p._id.equals(productId))
  
      if (!product) {
        throw new Error('Producto no encontrado en el carrito')
      }
  
      product.quantity = newQuantity;
      await cart.save()
  
      return cart;
    } catch (error) {
      throw error
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId)
  
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
  
      const initialProductCount = cart.products.length
  
      cart.products = cart.products.filter(p => !p._id.equals(productId))
  
      if (cart.products.length === initialProductCount) {
        throw new Error('Producto no encontrado en el carrito')
      }
  
      await cart.save();
      return cart
    } catch (error) {
      throw error
    }
  }

  async updateCartWithProducts(cartId, newProducts) {
    try {
      const cart = await cartModel.findById(cartId)
  
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
  
      cart.products = []
  
      newProducts.forEach(product => {
        cart.products.push({
          product: product.productId,
          quantity: product.quantity
        })
      })
  
      await cart.save();

      return cart
    } catch (error) {
      throw error
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId)
  
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
  
      cart.products = []
      await cart.save()
  
      return cart
    } catch (error) {
      throw error
    }
  }
}

export default new CartDao()