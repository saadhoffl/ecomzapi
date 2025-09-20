const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Protected
router.post("/add", authMiddleware, productController.addProduct);
router.put("/edit/:id", authMiddleware, productController.editProduct);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
