import express from "express";
import {
  createUserController,
  myProfileController,
} from "../controllers/user.controller.js";

const router = express.Router();

// apis
/**
 * GET /api/auth/myprofile
 */
router.get("/myprofile", myProfileController);
router.post("/create", createUserController);

export default router;
