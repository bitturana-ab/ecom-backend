import express from "express";
import {
  createUserController,
  myProfileController,
  loginUserController,
  updateUserController,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// apis
/**
 * GET /api/auth/myprofile
 */
router.get("/myprofile", isAuth, myProfileController);
router.post("/create", createUserController);
router.post("/login", loginUserController);
router.put("/update", isAuth, updateUserController);

export default router;
