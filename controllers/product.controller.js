import { productModel } from "../models/product.model.js";

/**
 * POST /api/product/create
 * - create product only
 */
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

/**
 * PUT /api/product/:id
 * - update product details with provided fields
 */
export const updateProduct = async (req, res) => {
  try {
    // find product with param id
    const product = await productModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // destructure fields
    const { name, description, price, stock } = req.body;
    // update provided fields only
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    // save to db
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product details updated successfully",
    });
  } catch (error) {
    // handle invalid id error
    if (error.name == "CastError") {
      res.status(401).json({
        success: false,
        message: "Invalid id",
      });
    }
    console.log("Error in update product api", error);
    res.status(401).json({
      success: false,
      message: "Error updating product",
    });
  }
};

/**
 * GET /api/product/all
 * - get all products
 */

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("error fetching all products", error);
    res.status(401).json({
      success: false,
      message: "Error in get all product",
    });
  }
};
