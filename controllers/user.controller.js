import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * GET /api/auth/myprofile
 * - to get current user profile
 */
export const myProfileController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "user data fetched",
    user: req.user,
  });
};

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
    // generate and set token to cookie
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SERCRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
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

/**
 *
 * POST api/auth/login
 * - to login email, password are required
 */
export const loginUserController = async (req, res) => {
  //   console.log(req.cookies);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are requried" });
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // compare pass
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SERCRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "Logged in user",
      user,
    });
  } catch (error) {
    console.log("Error in login api", error);
    return res.status(401).json({
      success: false,
      message: "Error in login api",
    });
  }
};

/**
 * PUT /api/auth/update-profile
 * - update user password
 */

export const updateUserController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // validation
    if (!oldPassword || !newPassword) {
      return res.status(401).json({
        success: false,
        message: "All fields are requried",
      });
    }
    // find user details
    const user = await userModel.findById(req.user._id).select("password");
    // compare old pass
    const isMatchPass = await bcrypt.compare(oldPassword, user.password);
    if (!isMatchPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // again hash new pass
    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Updated profile",
      user,
    });
  } catch (error) {
    console.log("error updating user profile", error);
  }
};
