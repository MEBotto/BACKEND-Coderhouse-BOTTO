import { productService } from "../services/factory.js";
import CustomError from "../services/errors/CustomError.js";
import { generateProductErrorInfo } from "../services/errors/infoError.js";
import { EErrors } from "../services/errors/enumsError.js";
import logger from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";
import jwt, { decode } from "jsonwebtoken";
import { config } from "../config/env.config.js";

const getProductsController = async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await productService.getProducts(
    limit,
    page,
    query,
    sort
  );

  res.status(200).json({ productData });
};

const getProductByIdController = async (req, res) => {
  const { pid } = req.params;

  try {
    const productFind = await productService.getProductById(pid);
    res.status(200).json({ productSelected: productFind });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const addProductController = async (req, res) => {
  const productReq = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const { user } = decodedToken;
    const { role, userId } = user;

    productReq.status = true;

    if (role === "premium") {
      productReq.owner = userId;
    }

    if (!productReq.code) {
      const uuid = uuidv4();
      const code = uuid.split("-")[0].toUpperCase();
      productReq.code = code;
    }

    if (
      productReq.title === undefined ||
      productReq.description === undefined ||
      productReq.price === undefined ||
      productReq.thumbnail === undefined ||
      productReq.category === undefined ||
      productReq.code === undefined ||
      productReq.status === undefined ||
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

    const productCreated = await productService.addProduct(productReq);
    res.status(201).json({
      message: "Product succesfully created",
      productCreated: productCreated,
    });
  } catch (error) {
    logger.error("[ERROR]: " + error);
    res.status(400).json({
      error: error.name,
      message: error.message,
      code: error.code,
    });
  }
};

const updateProductController = async (req, res) => {
  const { pid } = req.params;
  const productReq = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const product = await productService.getProductById(pid);

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const { user } = decodedToken;
    const { role, userId } = user;
    const { owner } = product;

    if (role === "premium" && userId !== owner) {
      throw new Error("You can only modify products created by the same user");
    }

    const updateProductResult = await productService.updateProduct(
      pid,
      productReq
    );
    if (updateProductResult.modifiedCount === 0)
      throw new Error("Product not found");

    res.status(200).json({ message: "Product has modified" });
  } catch (e) {
    logger.error("[ERROR]: " + e);
    res.status(500).json({
      error: e.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  const { pid } = req.params;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const product = await productService.getProductById(pid);

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const { user } = decodedToken;
    const { role, userId } = user;
    const { owner } = product;

    if (role === "premium" && userId !== owner) {
      throw new Error("You can only delete products created by the same user");
    }

    await productService.deleteProduct(pid);
    res.status(200).json({
      message: "Content successfully deleted!",
    });
  } catch (error) {
    logger.error("[ERROR]: " + error);
    res.status(400).json({
      error: error.message,
    });
  }
};

export {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
};
