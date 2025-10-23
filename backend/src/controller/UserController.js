const user = require("../model/User")
const Order = require("../model/Order.js");
const getcurrentuser = async (req, res) => {
  try {
    const User = await user.findById(req.userId).select("-password")

    if (!User) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(User)
  } catch (error) {
    console.log("🔥 getcurrentuser Error:", error) // ✅ টার্মিনালে দেখাবে
    res.status(500).json({ message: `getcurrentuser error: ${error.message}` })
  }
}
const gotcurrentadmin=async(req,res)=>{
   try {
    let adminemail=req.adminEmail
    if(!adminemail){

      return res.status(400).json({message:"Admin is not found"})
    }
    return res.status(200).json({
      email:adminemail,
      role:"admin"





    })
    
   } catch (error) {
     console.log("🔥 getAdmin  Error:", error) // ✅ টার্মিনালে দেখাবে
    res.status(500).json({ message: `getAdmin error: ${error.message}` })
    
   }












}
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .populate("products.product")
      .sort({ date: -1 }); // newest first

    res.status(200).json(orders);
  } catch (err) {
    console.error("GetUserOrders Error:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// ✅ Get specific order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    console.error("GetOrderDetails Error:", err);
    res.status(500).json({ message: "Failed to fetch order details", error: err.message });
  }
};

module.exports = {getcurrentuser,gotcurrentadmin,getOrderDetails,getUserOrders}
