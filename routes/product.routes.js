import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  uploadProductImage,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
// api
/**
 * create product
 */
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.get("/all", getAllProducts);
router.delete("/:id", deleteProduct);
router.post("/image/:id", upload.single("file"), uploadProductImage);

export default router;
