const Product = require("../models/Product");
const generateId = require("../utils/generateId");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    if (!title || !price)
      return res.status(400).json({ message: "title and price are required" });

    const id = await generateId();
    const newProduct = new Product({ id, title, description, price, imageUrl });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findOneAndUpdate({ id }, updateData, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Edit product error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
