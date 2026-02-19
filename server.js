import express from "express";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const PORT = process.env.PORT || 8000;

// listen / start server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} in ${process.env.NODE_MODE} mode`);
});
