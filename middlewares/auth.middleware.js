import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, token is missing",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    // const user = await userModel.findOne({ email: decodedToken.email });
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token user",
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};
