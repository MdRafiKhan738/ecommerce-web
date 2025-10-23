// src/Pages/ProductDetail.jsx
import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { shopdatacontext } from "../context/ShopContext";
import { userdatacontext } from "../context/UserContext";
import { FaStar, FaHeart, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import RelatedProducts from "../component/RelatedProduct";

const ProductDetail = () => {
  const { productid } = useParams();
  const { currency } = useContext(shopdatacontext);
  const { userData } = useContext(userdatacontext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const zoomRef = useRef(null);
  const zoomLensRef = useRef(null);
  const zoomResultRef = useRef(null);

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/${productid}`, { withCredentials: true });
        setProduct(res.data);
        setMainImage(res.data.image1);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [productid]);

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${productid}`, { withCredentials: true });
        setReviews(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [productid]);

  // Check Wishlist
  useEffect(() => {
    if (!userData || !product) return;
    const checkWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wishlist/${userData._id}`, { withCredentials: true });
        setWishlist(res.data?.products?.some(p => p._id === product._id));
      } catch (err) {
        console.error(err);
      }
    };
    checkWishlist();
  }, [userData, product]);

  // Add to Cart
  const addToCart = async () => {
    if (!userData) return alert("Login first!");
    try {
      console.log("Adding to cart:", { userId: userData._id, productId: product._id, quantity });
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { userId: userData._id, productId: product._id, quantity },
        { withCredentials: true }
      );
      console.log("Cart API Response:", res.data);

      setSuccessMessage(res.data.message || "Product added to cart successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setTimeout(() => navigate("/addtocart"), 1500);
    } catch (err) {
      console.error("Add to cart error:", err.response ? err.response.data : err.message);
      alert(err.response?.data?.error || "Failed to add to cart!");
    }
  };

  // Toggle Wishlist
  const toggleWishlist = async () => {
    if (!userData) return alert("Login first!");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist/toggle",
        { userId: userData._id, productId: product._id },
        { withCredentials: true }
      );
      setWishlist(res.data.products.includes(product._id));
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Review
  const submitReview = async () => {
    if (!userData) return alert("Login first!");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reviews/add",
        { user: userData.name, productId: product._id, rating: userReview.rating, comment: userReview.comment },
        { withCredentials: true }
      );
      setReviews(prev => [...prev, res.data]);
      setUserReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Image Zoom
  const handleZoomMove = e => {
    const img = zoomRef.current;
    const lens = zoomLensRef.current;
    const result = zoomResultRef.current;
    const rect = img.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    const lensWidth = lens.offsetWidth / 2;
    const lensHeight = lens.offsetHeight / 2;

    lens.style.left = `${x - lensWidth}px`;
    lens.style.top = `${y - lensHeight}px`;

    const fx = result.offsetWidth / lens.offsetWidth;
    const fy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundPosition = `-${(x - lensWidth) * fx}px -${(y - lensHeight) * fy}px`;
  };

  if (!product) return <div className="mt-32 text-center text-3xl text-white">Loading...</div>;

  const images = [product.image1, product.image2, product.image3, product.image4];

  return (
    <div className="min-h-screen bg-[#0f1724] text-white pt-32 px-4 sm:px-6 max-w-full overflow-x-hidden mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-wrap justify-center">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-[400px] lg:w-[500px] h-[400px] md:h-[500px] border border-white/10 rounded-xl overflow-hidden cursor-crosshair">
            <img
              src={mainImage}
              alt={product.name}
              ref={zoomRef}
              onMouseMove={handleZoomMove}
              className="w-full h-full object-contain"
            />
            <div
              ref={zoomLensRef}
              className="absolute w-24 h-24 md:w-32 md:h-32 border-2 border-teal-400 pointer-events-none rounded-xl bg-white/10"
            ></div>
          </div>
          <div
            ref={zoomResultRef}
            className="w-full md:w-[400px] lg:w-[500px] h-[400px] md:h-[500px] border border-white/10 rounded-xl bg-no-repeat"
            style={{ backgroundImage: `url(${mainImage})` }}
          ></div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6 max-w-[500px]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-300">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-400 ${i < Math.round(product.rating || 0) ? "opacity-100" : "opacity-40"}`}
                />
              ))}
            </div>
            <span className="text-white/70">{reviews.length} reviews</span>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-teal-400">{currency} {product.price}</p>
          <p className="text-white/70">{product.description}</p>

          {/* Quantity + Cart + Wishlist */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(q - 1, 1))} className="px-4 py-2 bg-white/10 hover:bg-white/20">
                <FaMinus />
              </button>
              <span className="px-6">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-white/10 hover:bg-white/20">
                <FaPlus />
              </button>
            </div>
            <button onClick={addToCart} className="bg-teal-400 px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition">
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={toggleWishlist} className={`px-4 py-3 rounded-xl border ${wishlist ? "bg-red-500 text-white" : "border-white/20"}`}>
              <FaHeart />
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-500 text-black font-semibold rounded-xl">
              {successMessage}
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`w-20 h-20 object-contain rounded-xl border cursor-pointer hover:scale-105 transition ${mainImage === img ? "border-teal-400" : "border-white/10"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-20 px-2 sm:px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-teal-300">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews.map((r, i) => (
            <div key={i} className="border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{r.user}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <FaStar key={j} className={`text-yellow-400 ${j < r.rating ? "opacity-100" : "opacity-40"}`} />
                  ))}
                </div>
              </div>
              <p className="text-white/70">{r.comment}</p>
            </div>
          ))}
        </div>

        {userData && (
          <div className="mt-10 border border-white/10 p-4 sm:p-6 rounded-2xl space-y-4">
            <h3 className="text-2xl font-semibold text-teal-300">Leave a Review</h3>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-400 cursor-pointer ${i < userReview.rating ? "opacity-100" : "opacity-40"}`}
                  onClick={() => setUserReview({ ...userReview, rating: i + 1 })}
                />
              ))}
            </div>
            <textarea
              rows={4}
              className="w-full bg-white/10 p-4 rounded-xl text-white placeholder-white/50"
              placeholder="Write your comment..."
              value={userReview.comment}
              onChange={e => setUserReview({ ...userReview, comment: e.target.value })}
            />
            <button onClick={submitReview} className="bg-teal-400 px-6 py-3 rounded-xl hover:scale-105 transition">
              Submit Review
            </button>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-20">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
