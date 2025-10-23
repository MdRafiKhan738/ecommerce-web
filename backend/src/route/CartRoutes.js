const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../model/Cart");
const Product = require("../model/Product"); // price এবং image জন্য
const router = express.Router();

/* ✅ Helper function: Calculate total cart price */
const calculateTotal = async (cart) => {
  let total = 0;
  for (const item of cart.products) {
    const product = await Product.findById(item.product);
    if (product) total += product.price * item.quantity;
  }
  cart.totalPrice = total;
  return total;
};

/* ✅ Add product to cart */
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || quantity < 1)
    return res.status(400).json({ error: "Invalid data" });

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ product: new mongoose.Types.ObjectId(productId), quantity }],
        totalPrice: 0,
      });
    } else {
      const existing = cart.products.find(p => p.product.toString() === productId);
      if (existing) existing.quantity += quantity;
      else cart.products.push({ product: new mongoose.Types.ObjectId(productId), quantity });
    }

    await calculateTotal(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("products.product");
    res.status(200).json({ message: "Product added to cart successfully", cart: populatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ Get cart by userId */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart) return res.status(200).json({ products: [], totalPrice: 0 });
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ Update quantity of cart item */
router.post("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || quantity < 1)
    return res.status(400).json({ error: "Invalid data" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.products.find(p => p.product.toString() === productId);
    if (!item) return res.status(404).json({ error: "Product not in cart" });

    item.quantity = quantity;
    await calculateTotal(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("products.product");
    res.status(200).json({ message: "Cart updated successfully", cart: populatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ Remove item from cart */
/* ✅ Remove item from cart */
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  console.log("Received remove request:", req.body); // <-- add this

  if (!userId || !productId)
    return res.status(400).json({ error: "Invalid data" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log("Cart not found for userId:", userId); // <-- add this
      return res.status(404).json({ error: "Cart not found" });
    }

    console.log("Before remove, cart products:", cart.products); // <-- add this
    const initialLength = cart.products.length;

    cart.products = cart.products.filter(p => {
      if (p.product && p.product._id) return p.product._id.toString() !== productId;
      if (p.product) return p.product.toString() !== productId;
      return true;
    });

    console.log("After remove, cart products:", cart.products); // <-- add this

    if (cart.products.length === initialLength)
      return res.status(404).json({ error: "Product not found in cart" });

    await calculateTotal(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("products.product");
    res.status(200).json({ message: "Product removed successfully", cart: populatedCart });
  } catch (err) {
    console.error("Server error:", err); // <-- add this
    res.status(500).json({ error: "Server error" });
  }
});



/* ✅ Clear entire cart */
router.post("/clear", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Invalid userId" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
