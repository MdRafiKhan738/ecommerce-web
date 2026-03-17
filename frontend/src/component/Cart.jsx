import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

// Animation Variants for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Cart = () => {
  const { userData } = useContext(userdatacontext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(null);
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.0;
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + shipping + tax;

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    if (!userData) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `https://onecartbackend-jbgj.onrender.com/api/cart/${userData._id}`,
          { withCredentials: true }
        );
        const items = res.data.products || [];
        setCartItems(items);
        calculateTotal(items);
      } catch (err) {
        console.error("Fetch cart error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [userData]);

  const removeItem = async (productId) => {
    if (!userData?._id || !productId) return;

    try {
      const res = await axios.post(
        "https://onecartbackend-jbgj.onrender.com/api/cart/remove",
        { userId: userData._id, productId },
        { withCredentials: true }
      );

      if (res.data?.cart?.products) {
        setCartItems(res.data.cart.products);
        calculateTotal(res.data.cart.products);
      }
    } catch (err) {
      console.error("Remove error:", err.response?.data || err.message);
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;
    setIsUpdating(productId);
    try {
      await axios.post(
        "https://onecartbackend-jbgj.onrender.com/api/cart/update",
        { userId: userData._id, productId, quantity: qty },
        { withCredentials: true }
      );
      const updated = cartItems.map((item) =>
        item.product?._id === productId ? { ...item, quantity: qty } : item
      );
      setCartItems(updated);
      calculateTotal(updated);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  // --- RENDERS ---

  if (!userData) {
    return (
      <div className="min-h-screen w-full bg-[#0f1724] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(45,212,191,0.1)]"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">You're not logged in!</h2>
          <p className="text-white/60 mb-8">Log in to unlock your OneCart experience.</p>
          <button onClick={() => navigate("/login")} className="px-8 py-4 bg-teal-400 text-[#0f1724] font-black rounded-xl hover:bg-teal-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all duration-300">
            Secure Login
          </button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0f1724] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <CgSpinner className="text-teal-400 text-6xl drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
        </motion.div>
      </div>
    );
  }

  return (
    // FULL WIDTH BACKGROUND WRAPPER
    <div className="min-h-screen w-full bg-[#0f1724] text-white pt-24 pb-12 font-sans selection:bg-teal-400/30">
      

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20">
              <FaShoppingCart className="text-4xl text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-500 tracking-tight">
              One Cart
            </h1>
          </div>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 text-teal-300 py-2 px-6 rounded-full font-bold border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            {cartItems.length} {cartItems.length === 1 ? "Premium Item" : "Premium Items"}
          </motion.span>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-sm"
          >
            <motion.img 
              animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
              alt="Empty Cart" 
              className="w-48 h-48 opacity-40 mb-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] filter grayscale invert" 
            />
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">Your cart is waiting.</h2>
            <p className="text-white/50 mb-10 text-lg">Discover top-tier gear and fill it up.</p>
            <Link to="/" className="group relative px-10 py-4 bg-teal-400 text-[#0f1724] font-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)] transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">Explore Collection <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: CART ITEMS */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="xl:col-span-2 flex flex-col gap-5"
            >
              <AnimatePresence>
                {cartItems.map((item) => {
                  const product = item.product || {};
                  const imgSrc = product.image1 || fallbackImage;
                  const isItemUpdating = isUpdating === product._id;

                  return (
                    <motion.div
                      layout
                      variants={itemVariants}
                      key={product._id}
                      exit={{ opacity: 0, scale: 0.9, x: -50 }}
                      className={`relative flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/10 hover:border-teal-400/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden group ${isItemUpdating ? 'opacity-50 pointer-events-none blur-[1px]' : ''}`}
                    >
                      {/* Background Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Product Image */}
                      <div className="relative w-full sm:w-36 h-48 sm:h-36 bg-black/40 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                        <motion.img
                          src={imgSrc}
                          alt={product.name || "Product Image"}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col text-center sm:text-left w-full z-10">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight">
                          {product.name || "Unknown Product"}
                        </h2>
                        <p className="text-teal-400 font-extrabold text-xl mb-6 drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]">
                          ${(product.price || 0).toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto mt-auto gap-4">
                          <div className="flex items-center gap-1 bg-[#0a1019] rounded-xl p-1.5 border border-white/10 shadow-inner">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(product._id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 text-white/70 hover:text-white rounded-lg transition-colors"
                            >
                              <FaMinus className="text-xs" />
                            </motion.button>
                            <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(product._id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-teal-500/30 text-white/70 hover:text-teal-300 rounded-lg transition-colors"
                            >
                              <FaPlus className="text-xs" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end h-full w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/10 sm:border-none z-10">
                        <p className="font-black text-2xl text-white">
                          ${((product.price || 0) * item.quantity).toFixed(2)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeItem(product._id)}
                          className="flex items-center gap-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 px-5 py-3 sm:py-2 rounded-xl transition-all duration-300 font-bold text-sm"
                        >
                          <FaTrash /> <span className="sm:hidden">Remove Item</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="xl:sticky top-28 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[2rem] p-8 shadow-2xl backdrop-blur-2xl"
            >
              <h2 className="text-3xl font-black mb-8 border-b border-white/10 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                Summary
              </h2>
              
              <div className="space-y-5 text-white/70 mb-8 font-medium text-lg">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-teal-400 font-bold bg-teal-400/10 px-3 py-1 rounded-md" : "text-white font-bold"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Tax <span className="text-xs text-white/40 ml-1">(5%)</span></span>
                  <span className="text-white font-bold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 pt-8 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-white/80">Total</span>
                  <motion.span
                    key={finalTotal}
                    initial={{ scale: 1.2, opacity: 0, color: "#fff" }}
                    animate={{ scale: 1, opacity: 1, color: "#2dd4bf" }}
                    className="text-4xl font-black drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                  >
                    ${finalTotal.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px -10px rgba(45,212,191,0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/placeorder")}
                className="group w-full flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0f1724] font-black text-xl rounded-2xl hover:from-teal-300 hover:to-emerald-300 transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Secure Checkout <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 cursor-pointer" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </motion.button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Taxes & shipping verified at checkout.
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
