import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
configDotenv();
// create app instance
const app = express();
const PORT = process.env.PORT || 8000;
// connect to db
connectDB();

// use middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan());

// routes import
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
// api routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully",
  });
});
app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);

// listen / start server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} in ${process.env.NODE_MODE} mode`);
});
