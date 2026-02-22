import { productModel } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // validation
    if (!name || !description || !price || !stock) {
      return res.status(401).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    // create product
    const product = await productModel.create({
      name,
      description,
      price,
      stock,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Error in create product api", error);
    res.status(401).json({
      success: false,
      message: "Error creating product",
    });
  }
};
