const express = require("express");
const router = express.Router();
const upload = require("../middleware/Multer.jsx"); // multer
const { addproduct, listproduct, removeproduct } = require("../controller/ProductController.js");
const adminauth = require("../middleware/AdminAuth.jsx");

// Product add
router.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  
                               

  ]),
  addproduct
);

// List all products
router.get("/list", listproduct);

// Remove product
router.post("/remove/:id",  removeproduct);
// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const Product = require('../model/Product.js'); // model import
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
