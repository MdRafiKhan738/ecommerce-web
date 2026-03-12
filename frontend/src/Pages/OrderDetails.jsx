// src/Pages/OrderDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoneyBillWave,
  FaRupeeSign,
  FaCheckCircle,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaBoxOpen,
  FaTruck,
  FaHome,
  FaCreditCard
} from "react-icons/fa";

const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { orderId } = useParams();
  const { userData } = useContext(userdatacontext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError(err.response?.data?.message || "Failed to fetch order details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) fetchOrder();
  }, [userData, orderId]);

  const getStatusIndex = (status) => statusSteps.indexOf(status || "Pending");

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
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
          className="w-16 h-16 border-t-4 border-b-4 border-cyan-400 rounded-full"
        />
        <p className="text-xl text-cyan-300 font-medium tracking-widest animate-pulse">
          DECRYPTING ONECART ORDER...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
        <p className="text-3xl text-red-500 font-bold">{error || "Order anomalies detected. Not found."}</p>
        <button 
          onClick={() => navigate('/orderhistory')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-bold transition-all"
        >
          Return to History
        </button>
      </div>
    );
  }

  const currentStepIndex = getStatusIndex(order.status);
  const progressPercentage = (currentStepIndex / (statusSteps.length - 1)) * 100;

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans pb-32">
      {/* Animated Deep Blue Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-700 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto pt-28 px-6 relative z-10">
        
        {/* Header & Back Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ x: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-3 bg-[#0f172a]/80 backdrop-blur-md border border-gray-800 hover:border-blue-500/50 rounded-full text-blue-400 font-semibold transition-all shadow-lg"
          >
            <FaArrowLeft /> Back to Orders
          </motion.button>
          
          <div className="text-left md:text-right">
            <motion.h1
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Order Details
            </motion.h1>
            <p className="text-gray-400 font-mono mt-2 tracking-wider">ID: {order._id}</p>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          
          {/* Top Info Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(59,130,246,0.1)" }}
              className="bg-[#0f172a]/60 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaCreditCard size={80} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                <FaCheckCircle /> Order Summary
              </h2>
              <div className="space-y-4 text-gray-300 relative z-10">
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Date Placed</span>
                  <span className="font-medium text-white">{new Date(order.date).toLocaleString()}</span>
                </p>
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-white flex items-center gap-2">
                    {order.paymentMethod === "COD" ? <FaMoneyBillWave className="text-green-400"/> : <FaRupeeSign className="text-blue-400"/>} 
                    {order.paymentMethod}
                  </span>
                </p>
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">Payment Status</span>
                  <span className={`font-bold ${order.paymentStatus ? "text-green-400" : "text-yellow-400"}`}>
                    {order.paymentStatus ? "Verified" : "Pending Authorization"}
                  </span>
                </p>
                <p className="flex justify-between pt-2">
                  <span className="text-lg text-gray-400">Total Amount</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    ${order.amount.toFixed(2)}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(6,182,212,0.1)" }}
              className="bg-[#0f172a]/60 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-8 relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaMapMarkerAlt size={80} className="text-cyan-500" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                <FaHome /> Delivery Destination
              </h2>
              <div className="space-y-4 text-gray-300 relative z-10">
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                  <FaUser className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Recipient</p>
                    <p className="font-semibold text-white">{order.address?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <FaEnvelope className="text-blue-500" />
                    <p className="text-sm truncate w-full" title={order.address?.email}>{order.address?.email}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <FaPhone className="text-blue-500" />
                    <p className="text-sm">{order.address?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <FaMapMarkerAlt className="text-blue-500 mt-1" />
                  <p className="text-sm leading-relaxed">
                    {order.address?.street}, {order.address?.landmark && `${order.address.landmark}, `} <br />
                    {order.address?.city}, {order.address?.state} {order.address?.zip} <br />
                    {order.address?.country}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Epic Order Tracking Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0f172a]/80 backdrop-blur-2xl border border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12 text-center tracking-widest uppercase">
              Live Shipment Status
            </h2>
            
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Background Track */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 rounded-full -translate-y-1/2" />
              
              {/* Animated Progress Fill */}
              <motion.div 
                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 rounded-full -translate-y-1/2 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Status Nodes */}
              <div className="relative flex justify-between items-center z-10">
                {statusSteps.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                          isActive 
                            ? "bg-[#020617] border-2 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                            : "bg-gray-900 border-2 border-gray-700 text-gray-600"
                        }`}
                      >
                        {index === 0 && <FaBoxOpen />}
                        {index === 1 && <FaHourglassHalf className={isCurrent ? "animate-spin-slow" : ""} />}
                        {index === 2 && <FaTruck className={isCurrent ? "animate-pulse" : ""} />}
                        {index === 3 && <FaHome />}
                      </motion.div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className={`absolute -bottom-10 text-xs md:text-sm font-bold uppercase tracking-wider ${isActive ? "text-cyan-300" : "text-gray-600"}`}
                      >
                        {step}
                      </motion.p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Ordered Products Grid */}
          <motion.div variants={itemVariants} className="pt-8">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Manifested Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.products.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-blue-500/40 rounded-2xl p-5 flex items-center gap-5 transition-all shadow-lg group"
                >
                  <div className="w-24 h-24 rounded-xl bg-white/5 p-2 flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={item.product?.image1}
                      alt={item.product?.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {item.product?.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                      <span className="bg-gray-800 px-2 py-1 rounded-md">Qty: {item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-cyan-400 font-bold pt-2">
                      Sub: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetails;