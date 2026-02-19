import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("connect to db"))
      .catch((err) => console.log("error connecting db", err));
  } catch (err) {
    console.log("error connecting to db", err);
  }
};
