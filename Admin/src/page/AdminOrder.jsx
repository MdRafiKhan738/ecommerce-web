import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];
const fallbackImage = "https://via.placeholder.com/80?text=No+Image";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "https://onecartbackend-jbgj.onrender.com/adminorder/listallorders",
        { withCredentials: true }
      );
      // Ensure image URLs are absolute
      const ordersWithImages = res.data.map(order => ({
        ...order,
        products: order.products.map(item => ({
          ...item,
          product: {
            ...item.product,
            image1:
              item.product?.image1?.startsWith("http")
                ? item.product.image1
                : `https://onecartbackend-jbgj.onrender.com/${item.product?.image1 || ""}`,
          },
        })),
      }));
      setOrders(ordersWithImages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  // Update order status
  const changeStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await axios.put(
        `https://onecartbackend-jbgj.onrender.com/adminorder/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      await fetchOrders();
      setUpdatingOrderId(null);
    } catch (err) {
      console.error(err);
      setUpdatingOrderId(null);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center text-white mt-32 text-3xl animate-pulse">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-32 text-3xl animate-pulse">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-teal-400 border-b-4 border-teal-600 inline-block pb-2">
        Admin Order Tracking
      </h1>

      <div className="flex flex-col gap-6">
        {orders.length === 0 && (
          <p className="text-center text-white/70">No orders found.</p>
        )}

        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div>
                <p>
                  <span className="font-bold text-teal-400">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Total Amount:</span>{" "}
                  ${order.amount?.toFixed(2) || "0.00"}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Payment:</span>{" "}
                  {order.paymentMethod || "N/A"} -{" "}
                  {order.paymentStatus ? "Paid" : "Pending"}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Date:</span>{" "}
                  {order.date ? new Date(order.date).toLocaleString() : "N/A"}
                </p>
              </div>

              {/* Status Buttons */}
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                {statusSteps.map((step) => (
                  <button
                    key={step}
                    disabled={updatingOrderId === order._id || step === order.status}
                    onClick={() => changeStatus(order._id, step)}
                    className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 ${
                      step === order.status
                        ? "bg-green-500 text-black cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {order.products?.map((item, idx) => {
                const product = item.product || {};
                const imgSrc = product.image1 || fallbackImage;

                return (
                  <motion.div
                    key={product._id || idx}
                    className="flex items-center gap-4 p-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={imgSrc}
                      alt={product.name || "Product Image"}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <div>
                      <p className="font-bold">{product.name || "N/A"}</p>
                      <p>Qty: {item.quantity || 0}</p>
                      <p>Price: ${item.price?.toFixed(2) || "0.00"}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Status Progress */}
            <div className="flex items-center justify-between mt-2">
              {statusSteps.map((step, idx) => {
                const completedIdx = statusSteps.indexOf(order.status);
                const isCompleted = idx <= completedIdx;
                return (
                  <div
                    key={step}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? "bg-teal-400" : "bg-white/20"
                      } text-black`}
                    >
                      {isCompleted ? <FaCheckCircle /> : <FaHourglassHalf />}
                    </div>
                    <p className="mt-2 text-sm text-white/80">{step}</p>
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`absolute top-5 right-[-50%] w-full h-1 ${
                          isCompleted ? "bg-teal-400" : "bg-white/20"
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
