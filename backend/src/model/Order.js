const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Pending", required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: Boolean, required: true },
  date: { type: Number, required: true }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
