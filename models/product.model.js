import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide product stock"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    images: [
      {
        public_id: { type: String },
        uri: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export const productModel = mongoose.model("product", productSchema);
