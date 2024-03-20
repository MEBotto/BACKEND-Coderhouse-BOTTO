import fs from "fs"
import ProductManager from "./ProductManager.js"

const PM = new ProductManager("./src/data/productos.json")
PM.init()

export default class cartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async init() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.listOfCarts = JSON.parse(data);
    } catch (error) {
      throw new Error('Error al inicializar la lista de carritos', error)
    }
  }
  
  async addCart() {
    this.listOfCarts.push({id: this.getNextId(), products: []});
    await this.saveToFile()
  }

  async addProductCart(cartId, productId) {
    // Verifica si el carrito existe
    const cartIndex = this.listOfCarts.findIndex((element) => element.id == cartId);
    if (cartIndex >= 0) {
      // Verifica si el producto existe en el ProductManager
      try {
        await PM.getProductByID(Number(productId))
  
        const productIndex = this.listOfCarts[cartIndex].products.findIndex((element) => element.product == productId);
        if (productIndex >= 0) {
          this.listOfCarts[cartIndex].products[productIndex].quantity += 1;
        } else {
          this.listOfCarts[cartIndex].products.push({ "product": productId, "quantity": 1 });
        }
        await this.saveToFile();
      } catch (error) {
        throw new Error("Error al agregar producto al carrito: " + error.message);
      }
    } else {
      throw new Error("Carrito no encontrado con ese ID");
    }
  }

  getCarts(){
    return this.listOfCarts;
  }

  getCartById(cartId){
    const existingCart = this.listOfCarts.find((element) => element.id == cartId);
    if (existingCart){
      return existingCart
    }
    else{
      throw new Error("No existe un carrito con ese id " + cartId)
    }
  }

  getNextId() {
    const maxId = this.listOfCarts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    return maxId + 1;
  }

  async saveToFile() {
    const cartJSON = JSON.stringify(this.listOfCarts, null, 2);
    try {
      await fs.promises.writeFile(this.path, cartJSON);
    } catch (error) {
      throw new Error('Error al guardar los productos en el archivo:', error)
    }
  }
}