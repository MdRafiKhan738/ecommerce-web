import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import {
  FaMoneyBillWave,
  FaRupeeSign,
  FaCheckCircle,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { orderId } = useParams();
  const { userData } = useContext(userdatacontext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controls = useAnimation();

  // ✅ Fetch order details
  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`http://localhost:5000/order/${orderId}`, {
        withCredentials: true
      });

      setOrder(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch order error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch order");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) return;
    fetchOrder();
  }, [userData]);

  const getStatusIndex = (status) => statusSteps.indexOf(status);

  if (!userData)
    return <div className="mt-32 text-center text-3xl text-white animate-pulse">Login first to view order!</div>;

  if (loading)
    return <div className="mt-32 text-center text-3xl text-white animate-pulse">Loading order...</div>;

  if (error)
    return <div className="mt-32 text-center text-3xl text-red-500">{error}</div>;

  if (!order)
    return <div className="mt-32 text-center text-3xl text-white">Order not found!</div>;

  return (
    <div className="min-h-screen bg-[#0f1724] text-white pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold mb-12 text-teal-300 border-b-4 border-teal-400 inline-block pb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        Order Details
      </motion.h1>

      {/* Order + Delivery Info */}
      <motion.div
        className="flex flex-col md:flex-row gap-8 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Order Info */}
        <motion.div
          className="flex-1 bg-white/5 p-6 rounded-2xl shadow-lg flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-teal-300 mb-4">Order Summary</h2>
          <p><span className="font-bold">Order ID:</span> {order._id}</p>
          <p><span className="font-bold">Created At:</span> {new Date(order.date).toLocaleString()}</p>
          <p className="flex items-center gap-2">
            <span className="font-bold">Payment Method:</span>
            {order.paymentMethod === "COD" ? <FaMoneyBillWave className="text-green-400"/> : <FaRupeeSign className="text-blue-400"/>} {order.paymentMethod}
          </p>
          <p><span className="font-bold">Total Amount:</span> ${order.amount.toFixed(2)}</p>
          <p><span className="font-bold">Payment Status:</span> {order.paymentStatus ? "Paid" : "Pending"}</p>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          className="flex-1 bg-white/5 p-6 rounded-2xl shadow-lg flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-teal-300 mb-4">Delivery Address</h2>
          <p className="flex items-center gap-2"><FaUser className="text-teal-400"/> {order.address.name}</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-teal-400"/> {order.address.email}</p>
          <p className="flex items-center gap-2"><FaPhone className="text-teal-400"/> {order.address.phone}</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-teal-400"/> {order.address.street}, {order.address.landmark && order.address.landmark + ", "} {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</p>
        </motion.div>
      </motion.div>

      {/* Ordered Products */}
      <motion.div className="flex flex-col gap-6 mb-12">
        <h2 className="text-3xl font-bold text-teal-300 mb-4">Ordered Products</h2>
        {order.products.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col md:flex-row items-center gap-6 border border-white/10 p-5 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.img
              src={item.product.image1}
              alt={item.product.name}
              className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-xl cursor-pointer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl md:text-2xl font-bold">{item.product.name}</h3>
              <p className="text-white font-semibold">Qty: {item.quantity}</p>
              <p className="text-white/80 font-medium">Price: ${item.price.toFixed(2)}</p>
              <p className="text-white/80 font-medium">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Order Tracking */}
      <motion.div
        className="bg-white/5 p-6 rounded-2xl shadow-lg flex flex-col gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-4">Order Tracking</h2>
        <div className="flex items-center gap-4 justify-between relative">
          {statusSteps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusIndex(order.status) >= index ? "bg-teal-400" : "bg-white/20"} text-black z-10`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
              >
                {getStatusIndex(order.status) >= index ? <FaCheckCircle /> : <FaHourglassHalf />}
              </motion.div>
              <p className="mt-2 text-sm text-white/80">{step}</p>
              {index < statusSteps.length - 1 && (
                <motion.div
                  className={`absolute top-5 left-1/2 transform -translate-x-1/2 w-full h-1 ${getStatusIndex(order.status) >= index ? "bg-teal-400" : "bg-white/20"}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetails;
