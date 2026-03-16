// src/Pages/OrderDetailsHistory.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaBoxOpen,
  FaHourglassHalf,
  FaTruck,
  FaHome,
  FaShoppingBag,
  FaReceipt,
} from "react-icons/fa";

const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];

const OrderDetailsHistory = () => {
  const { userData } = useContext(userdatacontext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://onecartbackend-jbgj.onrender.com/userroutes/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Fetch Orders Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) fetchOrders();
  }, [userData]);

  const getStatusIndex = (status) => statusSteps.indexOf(status);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
  };

  // --- Render States ---
  if (!userData) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], textShadow: ["0px 0px 0px #3b82f6", "0px 0px 20px #3b82f6", "0px 0px 0px #3b82f6"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center text-3xl text-blue-400 font-bold"
        >
          Access Denied. Please login to OneCart!
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"
        />
        <p className="text-xl text-blue-300 font-medium tracking-widest animate-pulse">
          LOADING ONECART ORDERS...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
        <FaShoppingBag className="text-7xl text-gray-700" />
        <p className="text-3xl text-gray-400 font-bold">Your OneCart history is empty.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans">
      {/* Animated Deep Blue Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-700 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 pt-32 pb-12 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-2 text-sm"
        >
          OneCart Exclusive
        </motion.p>
        <motion.h1
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Order History
        </motion.h1>
      </div>

      {/* Orders Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 pb-32 space-y-12 relative z-10"
      >
        <AnimatePresence>
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              variants={cardVariants}
              whileHover={{ scale: 1.01, boxShadow: "0px 0px 40px rgba(59, 130, 246, 0.15)" }}
              className="bg-[#0f172a]/80 backdrop-blur-2xl border border-gray-800 hover:border-blue-500/50 rounded-[2rem] p-8 md:p-10 transition-colors duration-500 relative overflow-hidden group"
            >
              {/* Card Internal Glow Highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Order Meta Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-900/30 rounded-xl text-blue-400">
                    <FaReceipt size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                      Order ID: <span className="text-gray-200">{order._id}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      ${order.amount.toLocaleString()}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => navigate(`/orderdetails/${order._id}`)}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-colors flex items-center justify-center"
                    title="View Details"
                  >
                    <FaArrowRight size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Responsive Flex Tracker */}
              <div className="relative w-full mb-12 px-2 md:px-8">
                <div className="flex items-center justify-between relative">
                  {statusSteps.map((step, i) => {
                    const completed = getStatusIndex(order.status);
                    const active = i <= completed;
                    return (
                      <React.Fragment key={step}>
                        {/* Status Node */}
                        <div className="flex flex-col items-center relative z-20">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl text-xl md:text-2xl font-bold transition-all duration-500 ${
                              active
                                ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.6)] border border-blue-400"
                                : "bg-gray-800 text-gray-500 border border-gray-700"
                            }`}
                          >
                            {i === 0 && <FaBoxOpen />}
                            {i === 1 && <FaHourglassHalf />}
                            {i === 2 && <FaTruck />}
                            {i === 3 && <FaHome />}
                          </motion.div>
                          <p className={`absolute -bottom-8 text-xs md:text-sm font-bold tracking-wide ${active ? "text-blue-300" : "text-gray-600"}`}>
                            {step}
                          </p>
                        </div>

                        {/* Connecting Line */}
                        {i < statusSteps.length - 1 && (
                          <div className="flex-1 h-1 md:h-2 mx-2 md:mx-4 bg-gray-800 rounded-full relative overflow-hidden z-10 -mt-8">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                              initial={{ width: "0%" }}
                              animate={{ width: i < completed ? "100%" : "0%" }}
                              transition={{ duration: 0.8, delay: i * 0.2 + 0.5, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Products Horizontal Scroll / Grid */}
              <div className="mt-14 pt-6 border-t border-gray-800/50">
                <p className="text-sm text-blue-500 font-bold uppercase tracking-widest mb-4">Items in this order</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {order.products.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-[#020617]/50 p-3 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all flex flex-col items-center"
                    >
                      <div className="w-full h-32 relative rounded-xl overflow-hidden bg-white/5 p-2 mb-3">
                        <img
                          src={item.product?.image1}
                          alt={item.product?.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                        />
                      </div>
                      <p className="text-gray-200 font-semibold text-sm text-center truncate w-full">
                        {item.product?.name}
                      </p>
                      <div className="flex justify-between w-full mt-2 px-1 text-xs text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        <span className="text-blue-400 font-bold">${item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OrderDetailsHistory;
