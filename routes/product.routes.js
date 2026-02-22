import express from "express";
import {
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();
// api
/**
 * create product
 */
router.post("/create", createProduct);
router.put("/:id", updateProduct);

export default router;
