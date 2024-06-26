export const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.
  List of required properties:
  * title: needs to be a String, received: ${product.title}
  * description: needs to be a String, received: ${product.description}
  * price: needs to be a Number, received: ${product.price}
  * thumbnail: needs to be a String, received: ${product.thumbnail}
  * category: needs to be a Category ENUM, received: ${product.category}
  * stock: needs to be a Number, received: ${product.stock}
  * code: needs to be a String, received: ${product.code}
  * status: needs to be a Boolean, received: ${product.status}`;
};