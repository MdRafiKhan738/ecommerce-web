const Order = require("../model/Order.js");

// List all orders for admin
const listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product").sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("products.product");

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

module.exports = { listAllOrders, updateOrderStatus };
