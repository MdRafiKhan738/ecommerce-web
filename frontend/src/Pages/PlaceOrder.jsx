import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaCreditCard,
  FaMoneyBillWave,
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt,
  FaLocationArrow,
  FaCity,
  FaGlobe,
  FaMapPin
} from "react-icons/fa";

const PlaceOrder = () => {
  const { userData } = useContext(userdatacontext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    altPhone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!userData) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://onecartbackend-jbgj.onrender.com/api/cart/${userData._id}`,
        { withCredentials: true }
      );
      const items = res.data.products || [];
      setCartItems(items);
      calculateTotal(items);
      setLoading(false);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userData]);

  // Remove item safely
  const removeItem = async (productId) => {
    if (!userData || !productId) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { userId: userData._id, productId },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data.cart) {
        setCartItems(res.data.cart.products);
        calculateTotal(res.data.cart.products);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error removing item from cart!");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation helpers
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10,15}$/.test(phone);
  const isValidZip = (zip, country) => {
    if (country.toLowerCase() === "india") return /^\d{6}$/.test(zip);
    if (country.toLowerCase() === "usa") return /^\d{5}(-\d{4})?$/.test(zip);
    return zip.length > 2;
  };
  const isFormValid = () => {
    const { name, email, phone, street, city, state, zip, country } = formData;
    return (
      name && email && phone && street && city && state && zip && country &&
      isValidEmail(email) &&
      isValidPhone(phone) &&
      isValidZip(zip, country)
    );
  };

  // Place order securely
  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert("Please fill all required details correctly!");
      return;
    }
    if (!cartItems.length) {
      alert("Cart is empty!");
      return;
    }

    const itemsToSend = cartItems
      .filter((item) => item.product && item.product._id && item.product.price !== undefined)
      .map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));

    if (itemsToSend.length === 0) {
      alert("Cart items invalid! Please refresh your cart.");
      return;
    }

    try {
      const res = await axios.post(
        "https://onecartbackend-jbgj.onrender.com/order/placeorder",
        {
          items: itemsToSend,
          amount: itemsToSend.reduce((acc, i) => acc + i.price * i.quantity, 0),
          address: formData,
          paymentMethod,
        },
        { withCredentials: true }
      );

      if (res.data.order?._id) navigate(`/orderdetails/${res.data.order._id}`);
      else navigate("/");
    } catch (err) {
      console.error(err?.response || err);
      alert("Failed to place order!");
    }
  };

  // Helper to map icons to fields
  const getFieldIcon = (field) => {
    switch (field) {
      case "name": return <FaUser className="text-teal-400" />;
      case "email": return <FaEnvelope className="text-teal-400" />;
      case "phone":
      case "altPhone": return <FaPhone className="text-teal-400" />;
      case "street": return <FaMapMarkedAlt className="text-teal-400" />;
      case "landmark": return <FaLocationArrow className="text-teal-400" />;
      case "city": return <FaCity className="text-teal-400" />;
      case "state": return <FaMapPin className="text-teal-400" />;
      case "zip": return <FaMapPin className="text-teal-400" />;
      case "country": return <FaGlobe className="text-teal-400" />;
      default: return <FaMapPin className="text-teal-400" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  if (!userData)
    return (
      <div className="min-h-screen bg-[#0f1724] flex items-center justify-center text-3xl text-teal-300 font-bold animate-pulse">
        Initializing Secure Checkout...
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f1724] flex items-center justify-center text-3xl text-teal-300 font-bold animate-pulse">
        Loading Your Cart...
      </div>
    );

  return (
    /* FIXED: Added w-full, flex justify-center, and px to center the max-w container perfectly across all devices */
    <div className="min-h-screen bg-gradient-to-br from-[#0a1019] via-[#0f1724] to-[#0a1019] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-7xl w-full">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 inline-block tracking-tight">
            Checkout One Cart
          </h1>
          <p className="text-white/50 mt-2 text-lg font-medium">Complete your order securely</p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDE: Delivery Form (Takes up 7 columns on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="bg-teal-400/20 p-2 rounded-lg text-teal-400"><FaMapMarkedAlt /></span>
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((field) => (
                <motion.div
                  variants={itemVariants}
                  key={field}
                  className={`flex flex-col gap-2 ${field === "street" || field === "email" ? "md:col-span-2" : ""}`}
                >
                  <label className="text-sm font-semibold text-white/70 capitalize ml-1">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="relative flex items-center bg-[#0a1019]/50 border border-white/10 rounded-xl overflow-hidden focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-400 transition-all duration-300">
                    <div className="pl-4">
                      {getFieldIcon(field)}
                    </div>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Enter your ${field.toLowerCase()}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full bg-transparent px-4 py-3.5 text-white outline-none placeholder-white/30 font-medium"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Cart Summary & Payment (Takes up 5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Cart Items Card */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col h-full max-h-[600px]">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <span className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><FaMoneyBillWave /></span>
                 Order Summary
              </h2>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product?._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      className="flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-2xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                         <img src={item.product?.image1} alt={item.product?.name} className="object-contain w-full h-full drop-shadow-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{item.product?.name}</h3>
                        <p className="text-white/50 text-sm font-medium mt-1">Qty: {item.quantity}</p>
                        <p className="text-teal-300 font-bold mt-1">${(item.product?.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.product?._id)}
                        className="text-white/30 hover:text-red-500 p-2 text-xl transition-colors"
                      >
                        <FaTrash />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {cartItems.length === 0 && (
                  <p className="text-center text-white/50 py-10 font-medium">Your cart is empty.</p>
                )}
              </div>

              {/* Totals & Actions (Pinned to bottom) */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-center text-xl">
                  <span className="text-white/70 font-medium">Total Amount</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#0a1019]/50 border border-white/10 p-2 rounded-xl">
                  <div className="pl-3">
                    {paymentMethod === "COD" ? <FaMoneyBillWave className="text-teal-400 text-xl" /> : <FaRupeeSign className="text-blue-400 text-xl" />}
                  </div>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-transparent text-white font-bold outline-none py-2 px-2 appearance-none cursor-pointer"
                  >
                    <option value="COD" className="bg-[#0f1724] text-white">Cash on Delivery (COD)</option>
                    <option value="Razorpay" className="bg-[#0f1724] text-white">Pay Online (Razorpay)</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-black font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all"
                >
                  <FaCreditCard className="text-xl" />
                  CONFIRM ORDER
                </motion.button>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Optional Custom Scrollbar CSS for the cart list */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(20, 184, 166, 0.5);
        }
      `}} />
    </div>
  );
};

export default PlaceOrder;
