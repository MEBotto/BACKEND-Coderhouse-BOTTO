import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from "../services/db/product.service.js";
import CustomError from "../services/errors/CustomError.js";
import { generateProductErrorInfo } from "../services/errors/infoError.js";
import { EErrors } from "../services/errors/enumsError.js";

export const getProductController = async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await getProducts(limit, page, query, sort);
    res.status(200).json({ data: products, message: "Products list!" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
};

export const getProductByIDController = async (req, res) => {
  try {
    const { pid } = req.params
    const product = await getProductByID(pid)
    res.status(200).json({ data: product, message: "Product found!" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
};

export const postProductController = async (req, res) => {
  const productReq = req.body;

  try { 
    if (
      productReq.title === undefined ||
      productReq.description === undefined ||
      productReq.price === undefined ||
      productReq.thumbnail === undefined ||
      productReq.code === undefined ||
      productReq.stock === undefined
    ) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo(productReq),
        message:
          "Product cannot be created. Please see your console for details.",
        code: EErrors.MISSING_PROPERTY_ERROR,
      });
    }

    const product = await addProduct(productReq);
    res.status(200).json({ data: product, message: "Product created!" });
  } catch (error) {
    console.error(error.cause)
    res.status(400).json({ error: error.name, message: error.message, code: error.code });
  }
};

export const putProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await updateProduct(id, req.body);
    res.status(200).json({ data: product, message: "Product updated!" });
  } catch (error){
    res.status(400).json({ error, message: "error" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.status(200).json({ data: product, message: "Product deleted!" });
  } catch (error){
    res.status(400).json({ error, message: "error" });
  }
};