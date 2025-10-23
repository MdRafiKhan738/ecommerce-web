const express = require("express");
const isAuth = require("../middleware/IsAuth");
const { placeorder, getOrderDetails } = require("../controller/OrderController");

const router = express.Router();

// Place order
router.post("/placeorder", isAuth, placeorder);

// Get order details by ID

router.get("/:orderId", isAuth, getOrderDetails);

module.exports = router;
