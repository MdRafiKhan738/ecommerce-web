import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/UserContext";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaCreditCard,
  FaMoneyBillWave,
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt,
  FaLocationArrow
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
        // Always use populated cart from backend
        setCartItems(res.data.cart.products);
        calculateTotal(res.data.cart.products);
        alert(res.data.message || "Item removed successfully!");
      } else {
        alert(res.data.error || "Failed to remove item!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error removing item from cart!");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation helpers
  const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = phone => /^\d{10,15}$/.test(phone);
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
      .filter(item => item.product && item.product._id && item.product.price !== undefined)
      .map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price
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

      alert(res.data.message);

      if (res.data.order?._id) navigate(`/orderdetails/${res.data.order._id}`);
      else navigate("/");
    } catch (err) {
      console.error(err?.response || err);
      alert("Failed to place order!");
    }
  };

  if (!userData) return <div className="mt-32 text-center text-3xl text-white animate-pulse">Login first!</div>;
  if (loading) return <div className="mt-32 text-center text-3xl text-white animate-pulse">Loading cart...</div>;

  return (
    <div className="min-h-screen bg-[#0f1724] text-white pt-24 max-w-7xl ">
      <motion.h1
        className="text-5xl font-extrabold mb-10 text-teal-300 border-b-4 border-teal-400 inline-block pb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        Place Your Order
      </motion.h1>

      <motion.div className="flex flex-col md:flex-row gap-8">
        {/* Delivery Form */}
        <motion.div className="flex-1 bg-white/5 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-teal-300 mb-4">Delivery Details</h2>
          {["name","email","phone","altPhone","street","landmark","city","state","zip","country"].map(field => (
            <motion.div className="flex items-center gap-3" key={field}>
              {field==="name" && <FaUser className="text-teal-400 text-xl"/>}
              {field==="email" && <FaEnvelope className="text-teal-400 text-xl"/>}
              {field==="phone" && <FaPhone className="text-teal-400 text-xl"/>}
              {field==="altPhone" && <FaPhone className="text-teal-400 text-xl"/>}
              {field==="street" && <FaMapMarkedAlt className="text-teal-400 text-xl"/>}
              {field==="landmark" && <FaLocationArrow className="text-teal-400 text-xl"/>}
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none placeholder-white/70"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Cart & Total */}
        <motion.div className="flex-1 flex flex-col gap-4">
          {cartItems.map(item => (
            <motion.div key={item.product?._id} className="flex flex-wrap md:flex-nowrap items-center gap-4 border border-white/10 p-4 rounded-2xl bg-white/5">
              <motion.img src={item.product?.image1} alt={item.product?.name} className="w-28 h-28 object-contain rounded-xl"/>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold">{item.product?.name}</h3>
                <p className="text-white font-semibold">Qty: {item.quantity}</p>
                <p className="text-white/80 font-medium">Total: ${(item.product?.price*item.quantity).toFixed(2)}</p>
              </div>
              <motion.button onClick={()=>removeItem(item.product?._id)} className="text-red-500 text-2xl">
                <FaTrash/>
              </motion.button>
            </motion.div>
          ))}

          <motion.div className="mt-6 border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <h2 className="text-3xl font-bold text-teal-300">Total: ${totalPrice.toFixed(2)}</h2>

            <motion.div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              {paymentMethod==="COD" ? <FaMoneyBillWave className="text-green-400 text-2xl"/> : <FaRupeeSign className="text-blue-400 text-2xl"/>}
              <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="bg-transparent text-white font-bold outline-none text-lg">
                <option value="COD">Cash on Delivery</option>
                <option value="Razorpay">Razorpay</option>
              </select>
            </motion.div>

            <motion.button onClick={handlePlaceOrder} className="px-6 py-3 bg-teal-400 text-black font-bold rounded-xl flex items-center gap-3 text-xl">
              <FaCreditCard/> Place Order
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlaceOrder;
