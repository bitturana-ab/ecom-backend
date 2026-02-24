import { categoryModel } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category is required",
      });
    }
    // create category
    await categoryModel.create({ category });
    res.status(201).json({
      success: false,
      message: `${category} category created`,
    });
  } catch (error) {
    console.log("error in creating category api", error);
    // if (error.name == "CastError")
    res.status(401).json({
      success: false,
      message: "error creating category",
    });
  }
};

export const allCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(401).json({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "error get all category",
    });
  }
};
