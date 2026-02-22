import express from "express";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();
// api
/**
 * create product
 */
router.post("/create", createProduct);

export default router;
