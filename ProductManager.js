const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async init() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.productList = JSON.parse(data);
    } catch (error) {
      console.error('Error al inicializar la lista de productos:', error);
      this.productList = [];
    }
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Todos los campos deben de estar rellenos");
      return;
    }
    if (this.productList.some(existingProduct => existingProduct.code === product.code)) {
      console.log("El Producto [" + product.title + "] ya ha sido ingresado\nintente nuevamente con otro código! \ncancelando carga...");
      return;
    }

    product.id = this.getNextId();
    this.productList.push(product);
    await this.saveProductsToFile();
  }

  getProducts() {
    return this.productList;
  }

  getProductByID(id) {
    const search = this.productList.find(product => product.id === id);
    if (search) {
      return search;
    } else {
      console.log("El producto con ese ID no existe");
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    const index = this.productList.findIndex(product => product.id === id);
    if (index !== -1) {
      this.productList[index] = { ...this.productList[index], ...updatedProduct };
      await this.saveProductsToFile();
    } else {
      console.log("El producto con ese ID no existe");
    }
  }

  async deleteProduct(id) {
    const index = this.productList.findIndex(product => product.id === id);
    if (index >= 0) {
      this.productList.splice(index, 1);
      await this.saveProductsToFile();
    } else {
      console.log("El producto con ese ID no existe");
    }
  }

  getNextId() {
    const maxId = this.productList.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  async saveProductsToFile() {
    const productsJSON = JSON.stringify(this.productList, null, 2);
    try {
      await fs.writeFile(this.path, productsJSON);
    } catch (error) {
      console.log('Error al guardar los productos en el archivo:', error);
    }
  }
}
(async () => {
  const productManager = new ProductManager("productos.json")
  await productManager.init()

  await productManager.addProduct({
    title: 'Peluche Pochita',
    description: 'Peluche de pochita, personaje del manga Chainsaw Man',
    price: 8900,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0267/6234/6595/products/pochita_1800x.jpg?v=1668719018',
    code: 'P001',
    stock: 5,
  })
  await productManager.addProduct({
    title: 'Chainsaw Man - Tomo 1',
    description: 'Primer tomo de la serie de manga Chainsaw Man',
    price: 3500,
    thumbnail: 'https://lesinstantsvolesalavie.files.wordpress.com/2020/02/chainswanman.jpg?w=430',
    code: 'P002',
    stock: 5,
  })
  await productManager.addProduct({
    title: 'Violet Evergarden - Tomo 1',
    description: 'Primer tomo de la serie de novelas Violet Evergarden',
    price: 7000,
    thumbnail: 'https://1.bp.blogspot.com/-RY3LDGKfE5g/WgFOjvHT8CI/AAAAAAAAAPY/ngXwC8yX-44WdBE9pIxbCixDErN_m3H2gCLcBGAs/s640/portada.jpg',
    code: 'P003',
    stock: 5,
  })

  console.log('Lista de Productos:\t');
  console.log(productManager.getProducts());

  const product = productManager.getProductByID(2)

  if (product) {
    console.log('Producto encontrado por ID:\t');
    console.log(product);
  }

  await productManager.updateProduct(2, { price: 5000, stock: 10 });

  console.log('Lista de Productos actualizada:');
  console.log(productManager.getProducts());

  await productManager.deleteProduct(1);

  console.log('Lista de Productos después de eliminar el producto con ID 1:');
  console.log(productManager.getProducts());
})()