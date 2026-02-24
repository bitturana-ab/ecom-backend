import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please provide category"],
  },
});

export const categoryModel = mongoose.model("category", categorySchema);
