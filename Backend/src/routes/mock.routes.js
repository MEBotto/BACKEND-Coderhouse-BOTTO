import { getProductsFromMock } from "../controllers/mockFetchController.js";
import { Router } from "express";

const router = Router();

router.get("/", getProductsFromMock);

export default router;