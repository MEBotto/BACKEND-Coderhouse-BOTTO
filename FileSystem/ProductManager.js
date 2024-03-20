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
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.status || !product.category) {
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
      let titleP = updatedProduct.title == null ? this.productList[index].title : updatedProduct.title;
      let descriptionP = updatedProduct.description == null ? this.productList[index].description : updatedProduct.description;
      let codeP = updatedProduct.code == null ? this.productList[index].code : updatedProduct.code;
      let priceP = isNaN(updatedProduct.price) ? this.productList[index].price : updatedProduct.price;
      let stockP = isNaN(updatedProduct.stock) ? this.productList[index].stock : updatedProduct.stock;  
      let categoryP = updatedProduct.category == null ? this.productList[index].category : updatedProduct.category;  
      let statusP = updatedProduct.status == null ? this.productList[index].status : updatedProduct.status;  
      let thumbnailsP = updatedProduct.thumbnail == null ? this.productList[index].thumbnail : updatedProduct.thumbnail;

      this.productList[index] = { 
        ...this.productList[index],
        title: titleP, 
        description: descriptionP, 
        code: codeP, 
        price: Number(priceP), 
        stock: Number(stockP), 
        status: statusP,
        category: categoryP,
        thumbnail: thumbnailsP 
      }

      await this.saveProductsToFile()
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