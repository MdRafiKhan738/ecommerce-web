const express = require("express");
const router = express.Router();
const adminauth = require("../middleware/AdminAuth.jsx");
const { listAllOrders, updateOrderStatus } = require("../controller/AdminOrderController.js");

// List all orders
router.get("/listallorders", adminauth, listAllOrders);

// Update order status
router.put("/:orderId/status", adminauth, updateOrderStatus);

module.exports = router;
