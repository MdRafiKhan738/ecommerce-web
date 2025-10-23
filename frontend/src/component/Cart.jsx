import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const fallbackImage = "https://via.placeholder.com/100?text=No+Image";

const Cart = () => {
  const { userData } = useContext(userdatacontext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) =>
        acc + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    if (!userData) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${userData._id}`,
          { withCredentials: true }
        );
        const items = res.data.products || [];
        setCartItems(items);
        calculateTotal(items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, [userData]);

const removeItem = async (productId) => {
  // ✅ Validate inputs first
  if (!userData?._id) {
    console.error("Cannot remove: userData._id is missing");
    return;
  }
  if (!productId) {
    console.error("Cannot remove: productId is missing");
    return;
  }

  console.log("Removing productId:", productId);
  console.log("userId:", userData._id);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/remove",
      { userId: userData._id, productId },
      { withCredentials: true }
    );

    console.log("Remove response:", res.data);

    // ✅ Update cart with backend response
    if (res.data?.cart?.products) {
      setCartItems(res.data.cart.products);
      // recalculate total
      const newTotal = res.data.cart.products.reduce(
        (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
        0
      );
      setTotalPrice(newTotal);
    }
  } catch (err) {
    console.error("Axios remove error:", err.response?.data || err.message);
  }
};

  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;
    try {
      await axios.post(
        "http://localhost:5000/api/cart/update",
        { userId: userData._id, productId, quantity: qty },
        { withCredentials: true }
      );
      const updated = cartItems.map((item) =>
        item.product?._id === productId ? { ...item, quantity: qty } : item
      );
      setCartItems(updated);
      calculateTotal(updated);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData)
    return (
      <div className="mt-32 text-center text-3xl text-white">
        Login first to see your cart!
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1724] text-white pt-32 px-4 sm:px-6 max-w-full mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-teal-300 animate-pulse">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-white/70 text-xl">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {cartItems.map((item, idx) => {
              const product = item.product || {};
              const imgSrc = product.image1 || fallbackImage;

              return (
                <motion.div
                  key={product._id || idx}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap md:flex-nowrap items-center gap-4 border border-white/10 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <motion.img
                    src={imgSrc}
                    alt={product.name || "Product Image"}
                    className="w-28 h-28 object-contain rounded-xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                  <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-semibold">
                      {product.name || "N/A"}
                    </h2>
                    <motion.p
                      key={item.quantity}
                      initial={{ scale: 0.9, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-white font-bold text-lg"
                    >
                      ${(product.price || 0 * item.quantity).toFixed(2)}
                    </motion.p>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(product._id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition"
                      >
                        <FaMinus />
                      </motion.button>

                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl"
                      >
                        {item.quantity}
                      </motion.span>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(product._id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition"
                      >
                        <FaPlus />
                      </motion.button>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(product._id)}
                    className="text-red-500 hover:text-red-400 text-xl"
                  >
                    <FaTrash />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-right mt-8 border-t border-white/10 pt-4"
          >
            <motion.h2
              key={totalPrice}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-teal-300"
            >
              Total: ${totalPrice.toFixed(2)}
            </motion.h2>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(14, 226, 226, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/placeorder")}
              className="mt-4 px-6 py-3 bg-teal-400 text-black font-bold rounded-xl hover:bg-teal-500 transition-all shadow-lg"
            >
              Place Order
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
