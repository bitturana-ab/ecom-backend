import { productModel } from "../models/product.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";

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

/**
 * DELETE /api/product/:id
 * - delete product by id
 */
export const deleteProduct = async (req, res) => {
  try {
    // find project by id then remove or destroy images then remove product from db
    const product = await productModel.findById(req.params.id);
    if (!product) {
      res.status(401).json({
        success: false,
        message: "Invalid Id",
      });
    }
    // use for loop with find index and public_id then destroy images
    // destroy images from cloudinary
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // handle invalid id error
    if (error.name == "CastError") {
      res.status(401).json({
        success: false,
        message: "Invalid id",
      });
    }
    console.log("error in deleting product", error);
    res.status(401).json({
      success: false,
      message: "Error deleting product",
    });
  }
};

/**
 * POST /api/product/image/:id
 * - upload images of product
 */

export const uploadProductImage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(401).json({
        success: false,
        message: "Invalid product id",
      });
    }
    // update product images
    if (!req.file) {
      return res.status(401).json({
        success: false,
        message: "Images are required",
      });
    }
    // use upload to cloudinary function
    const result = await uploadToCloudinary(req.file);

    // access result object and update image to product
    const image = {
      public_id: result.public_id,
      uri: result.secure_url,
    };
    // for more images use product.images.push(image) in diff route
    // product.images = [image];

    product.images.push(image);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product images uploaded",
      result,
    });
  } catch (error) {
    console.log("error in upload product image api", error);
    res.status(401).json({
      success: false,
      message: "Error uploading product image api",
    });
  }
};
