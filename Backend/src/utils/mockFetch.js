import { faker } from "@faker-js/faker";

export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    code: faker.string.numeric(1),
    stock: faker.string.numeric(1)
  }
}