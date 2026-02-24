import express from "express";
import {
  allCategory,
  createCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// category route apis
router.post("/create", createCategory);
router.get("/all", allCategory);

export default router;
