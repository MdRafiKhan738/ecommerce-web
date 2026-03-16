import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

const Cart = () => {
  const { userData } = useContext(userdatacontext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(null); // Tracks which item is being updated
  const navigate = useNavigate();

  // Calculate Order Summary Details
  const subtotal = totalPrice;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.0; // Free shipping over $100
  const tax = subtotal * 0.05; // 5% estimated tax
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
      <div className="min-h-screen bg-[#0f1724] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold text-white mb-4">You're not logged in!</h2>
          <p className="text-white/60 mb-6">Log in to view your OneCart.</p>
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-teal-400 text-black font-bold rounded-xl hover:bg-teal-500 transition-all">
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1724] flex items-center justify-center">
        <CgSpinner className="animate-spin text-teal-400 text-6xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1724] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <FaShoppingCart className="text-4xl text-teal-400" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
          Your Cart
        </h1>
        <span className="ml-auto bg-teal-500/20 text-teal-300 py-1 px-3 rounded-full font-semibold border border-teal-500/30">
          {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-48 h-48 opacity-50 mb-6 drop-shadow-2xl" />
          <h2 className="text-2xl font-bold text-white/80 mb-2">Your cart is feeling a bit empty.</h2>
          <p className="text-white/50 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="px-8 py-3 bg-teal-400 text-black font-bold rounded-xl hover:bg-teal-500 transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)]">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: CART ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {cartItems.map((item) => {
                const product = item.product || {};
                const imgSrc = product.image1 || fallbackImage;
                const isItemUpdating = isUpdating === product._id;

                return (
                  <motion.div
                    layout
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col sm:flex-row items-center gap-6 border border-white/10 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/30 transition-all duration-300 ${isItemUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-32 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                      <motion.img
                        src={imgSrc}
                        alt={product.name || "Product Image"}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col text-center sm:text-left">
                      <h2 className="text-xl font-bold text-white mb-1 line-clamp-1">
                        {product.name || "Unknown Product"}
                      </h2>
                      <p className="text-teal-300 font-semibold text-lg mb-4">
                        ${(product.price || 0).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 bg-black/30 w-max rounded-lg p-1 mx-auto sm:mx-0 border border-white/10">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(product._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-md transition"
                        >
                          <FaMinus className="text-sm" />
                        </motion.button>
                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(product._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-md transition"
                        >
                          <FaPlus className="text-sm" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex flex-col items-center sm:items-end justify-between h-full w-full sm:w-auto mt-4 sm:mt-0 gap-4 sm:gap-0">
                      <p className="font-bold text-xl hidden sm:block">
                        ${((product.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(product._id)}
                        className="flex items-center gap-2 text-red-400 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
                      >
                        <FaTrash className="text-sm" /> <span className="sm:hidden">Remove</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:sticky top-28 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-white/70 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-white font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-6 mb-8">
              <span className="text-xl font-bold">Total</span>
              <motion.span
                key={finalTotal}
                initial={{ scale: 0.9, color: "#fff" }}
                animate={{ scale: 1, color: "#5eead4" }}
                className="text-3xl font-extrabold text-teal-300"
              >
                ${finalTotal.toFixed(2)}
              </motion.span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(45,212,191,0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/placeorder")}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-black font-extrabold text-lg rounded-xl hover:from-teal-300 hover:to-teal-400 transition-all"
            >
              Checkout Now <FaArrowRight />
            </motion.button>
            <p className="text-center text-xs text-white/40 mt-4">Taxes and shipping calculated at checkout.</p>
          </motion.div>

        </div>
      )}
    </div>
  );
};

export default Cart;
