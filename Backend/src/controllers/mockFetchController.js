import { generateProduct } from "../utils/mockFetch.js";

export const getProductsFromMock = async (req, res) => {
  try {
    let products = [];
    for (let i = 0; i <= 100; i++) {
      products.push(generateProduct())
    }
    res.status(200).json({ status: "Success!", payload: products })
  } catch (error) {
    console.error(error)
    res.status(400).json({ status: "Bad Request", error })
  }
}