import express from "express";
import {
  createUserController,
  myProfileController,
  loginUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

// apis
/**
 * GET /api/auth/myprofile
 */
router.get("/myprofile", myProfileController);
router.post("/create", createUserController);
router.post("/login", loginUserController);

export default router;
