import fs from 'fs';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async init() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.productList = JSON.parse(data);
    } catch (error) {
      throw new Error('Error al inicializar la lista de productos', error)
    }
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error("Todos los campos deben de estar rellenos")
    }
    if (this.productList.some(existingProduct => existingProduct.code === product.code)) {
      throw new Error("El Producto [" + product.title + "] ya ha sido ingresado")
    }

    product.id = this.getNextId()
    this.productList.push(product)
    await this.saveProductsToFile()
  }

  getProducts() {
    return this.productList
  }

  getProductByID(id) {
    const search = this.productList.find(product => product.id === id);
    if (search) {
      return search
    } else {
      throw new Error("El producto con ese ID no existe")
    }
  }

  async updateProduct(id, updatedProduct) {
    const index = this.productList.findIndex(product => product.id === id);
    if (index !== -1) {
      this.productList[index] = { ...this.productList[index], ...updatedProduct };
      await this.saveProductsToFile();
    } else {
      throw new Error("El producto con ese ID no existe")
    }
  }

  async deleteProduct(id) {
    const index = this.productList.findIndex(product => product.id === id);
    if (index >= 0) {
      this.productList.splice(index, 1);
      await this.saveProductsToFile();
    } else {
      throw new Error("El producto con ese ID no existe")
    }
  }

  getNextId() {
    const maxId = this.productList.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  async saveProductsToFile() {
    const productsJSON = JSON.stringify(this.productList, null, 2);
    try {
      await fs.promises.writeFile(this.path, productsJSON);
    } catch (error) {
      throw new Error('Error al guardar los productos en el archivo:', error)
    }
  }
}