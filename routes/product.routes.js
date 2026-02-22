import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();
// api
/**
 * create product
 */
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.get("/all", getAllProducts);
router.delete("/:id", deleteProduct);

export default router;
