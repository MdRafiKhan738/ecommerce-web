const express = require("express");
const { getcurrentuser, gotcurrentadmin, getUserOrders } = require("../controller/UserController");
const isAuth = require("../middleware/IsAuth");
const adminauth = require("../middleware/AdminAuth.jsx");
const { getOrderDetails } = require("../controller/OrderController.js");

const userrouter = express.Router();

userrouter.get("/getcurrentuser", isAuth, getcurrentuser);
userrouter.post("/getcurrentadmin", adminauth, gotcurrentadmin);
userrouter.get("/orders", isAuth, getUserOrders);

// Order Details by ID
userrouter.get("/orders/:orderId", isAuth, getOrderDetails);
module.exports = userrouter;
