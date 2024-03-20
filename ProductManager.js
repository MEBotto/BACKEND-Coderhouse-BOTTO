class ProductManager {
  constructor() {
    this.idcounter = 0;
    this.productList = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      title != null ||
      description != null ||
      price != null ||
      thumbnail != null ||
      code != null ||
      stock != null
    ) {
      console.log("Producto cargado correctamente["+title+"]");
      if (this.productList.find((productList) => productList.code == code)) {
        console.log("El Producto ["+title+"] ya ha sido ingresado\nintente nuevamente con otro código! \ncancelando carga...");
      } else {
        const product = {
          id: this.idcounter++,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.productList.push(product);
      }
    } else {
      console.log("Error uno de los campos está vacio");
    }
  }

  getProducts() {
    return this.productList;
  }

  getProductByID(id){
    const search = this.productList.find((productList) => productList.id == id)
    if (search){
        return (search)
    }
    return search
  }
}
const products = new ProductManager();

products.addProduct(
  "Taza",
  "Taza para tomar té",
  500,
  "https://i.ytimg.com/vi/ucQ1aeSlI0s/maxresdefault.jpg",
  "1000",
  5
);
products.addProduct(
  "Taza2",
  "Taza para tomar cafe",
  500,
  "https://i.ytimg.com/vi/ucQ1aeSlI0s/maxresdefault.jpg",
  "1001",
  5
);
products.addProduct(
  "Taza2.2",
  "Taza para tomar matecocido",
  500,
  "https://i.ytimg.com/vi/ucQ1aeSlI0s/maxresdefault.jpg",
  "1000",
  5
);

console.log("Listado de productos: \t");
console.log(products.getProducts());

const search = products.getProductByID(1)
if(search){
    console.log("Product found: \t")
    console.log(Busqueda);
}else{
    console.log("Not found");
}