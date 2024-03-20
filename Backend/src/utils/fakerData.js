import { faker } from "@faker-js/faker"

export const generateFakeProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 0, max: 10000 }),
    thumbnail: faker.image.url(300, 300),
    code: faker.string.nanoid(21).toUpperCase(),
    stock: faker.number.int(200)
  }
}