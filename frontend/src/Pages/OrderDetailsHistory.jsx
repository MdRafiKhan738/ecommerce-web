// src/Pages/OrderDetailsHistory.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaArrowRight,
  FaBoxOpen,
  FaHourglassHalf,
  FaTruck,
  FaHome,
  FaCheckCircle,
} from "react-icons/fa";

const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];

const OrderDetailsHistory = () => {
  const { userData } = useContext(userdatacontext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/userroutes/orders", {
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

  // Scroll animation base
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  if (!userData)
    return (
      <div className="pt-40 text-center text-3xl text-cyan-400 font-bold animate-pulse">
        Please login to view your order history!
      </div>
    );

  if (loading)
    return (
      <div className="pt-40 text-center text-3xl text-cyan-300 font-bold animate-pulse">
        Loading your orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="pt-40 text-center text-cyan-300 text-3xl font-bold">
        No orders found yet!
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-x-hidden">
      {/* Floating gradient background animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,255,0.12),transparent_70%)]"
        style={{ y: backgroundY }}
      ></motion.div>

      {/* Title */}
      <motion.h1
        className="pt-36 pb-16 text-center text-transparent text-6xl md:text-7xl font-extrabold bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        My Order History
      </motion.h1>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto grid gap-14 pb-32 px-6">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700 hover:border-cyan-400/50 shadow-[0_0_30px_rgba(0,255,255,0.08)] rounded-3xl overflow-hidden p-8 transition-all duration-700"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 50px rgba(0,255,255,0.15)",
            }}
          >
            {/* Glowing Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-600 opacity-10 blur-2xl"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            ></motion.div>

            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-5 relative z-10">
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-semibold">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Date:</span>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Total:</span> $
                  {order.amount.toLocaleString()}
                </p>
              </div>
              <motion.button
                onClick={() => navigate(`/orderdetails/${order._id}`)}
                className="mt-6 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-500 rounded-full text-black font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-400/40"
                whileHover={{ scale: 1.05 }}
              >
                View Details <FaArrowRight />
              </motion.button>
            </div>

            {/* Order Tracking Status */}
            <div className="flex justify-center mt-10 relative z-10 overflow-x-auto">
              {statusSteps.map((step, i) => {
                const completed = getStatusIndex(order.status);
                const active = i <= completed;
                return (
                  <motion.div
                    key={step}
                    className="flex flex-col items-center relative mx-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold transition-all duration-500 ${
                        active
                          ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-black shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {i === 0 && <FaBoxOpen />}
                      {i === 1 && <FaHourglassHalf />}
                      {i === 2 && <FaTruck />}
                      {i === 3 && <FaHome />}
                    </div>
                    <p
                      className={`mt-3 text-sm font-medium ${
                        active ? "text-cyan-300" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>
                    {i < statusSteps.length - 1 && (
                      <motion.div
                        className={`absolute top-8 left-16 w-20 h-1 rounded-full ${
                          i < completed ? "bg-cyan-400" : "bg-gray-700"
                        }`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.7 }}
                      ></motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Product List */}
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
              {order.products.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group bg-gray-800/70 p-4 rounded-2xl border border-gray-700 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden"
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <div className="relative">
                    <img
                      src={item.product?.image1}
                      alt={item.product?.name}
                      className="w-full h-48 object-contain rounded-xl bg-gray-900"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-cyan-300 font-semibold text-center mb-3">
                        ${item.price}
                      </p>
                    </motion.div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-cyan-300 font-semibold text-lg">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsHistory;
