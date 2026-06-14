const express = require("express");
const router  = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.get("/featured", getFeaturedProducts);
router.get("/",         getProducts);
router.get("/:id",      getProductById);

// Admin only routes
router.post("/",        protect, admin, createProduct);
router.put("/:id",      protect, admin, updateProduct);
router.delete("/:id",   protect, admin, deleteProduct);

module.exports = router;