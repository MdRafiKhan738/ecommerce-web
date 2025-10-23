const User = require("../model/User.js");
const Order = require("../model/Order.js");

// Place order controller
const placeorder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.userId; // ✅ from isAuth middleware

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = await Order.create({
      userId,
      products: items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "COD" ? false : true,
      status: "Placed",
      date: Date.now()
    });

    // Clear user's cart
    await User.findByIdAndUpdate(userId, { cartdata: {} });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    console.error("PlaceOrder Error:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

// Get order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Properly populate products.product
    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    console.error("GetOrderDetails Error:", err);
    res.status(500).json({ message: "Failed to fetch order details", error: err.message });
  }
};

module.exports = { placeorder, getOrderDetails };
