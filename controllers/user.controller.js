import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * GET /api/auth/myprofile
 * - to get current user profile
 */
export const myProfileController = async (req, res) => {};
/**
 * POST /api/auth/create
 * - to create new user profile
 */
export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check if already exists via email
    const alreadyExist = await userModel.findOne({ email });
    if (alreadyExist) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    // hash pass
    const hashedPass = await bcrypt.hash(password, 10);

    // if not then create user
    const user = await userModel.create({
      name: name ? name : undefined,
      email,
      password: hashedPass,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("user create error", error);
    return res.status(401).json({
      success: false,
      message: "Error user creating",
    });
  }
};
