const Product = require("../models/productModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    const product = new Product({
      name,
      quantity,
      price,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the product" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, quantity, price }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the product" });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product" });
  }
};
