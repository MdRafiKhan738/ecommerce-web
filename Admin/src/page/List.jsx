import React, { useEffect, useState } from "react";
import SideBar from "../componets/SideBar.jsx"
import axios from "axios";

const List = () => {
  const [list, setlist] = useState([]);
  const [loading, setloading] = useState(true);

  // 🧠 Product list load
  const handlelist = async () => {
    try {
      const res = await axios.get("https://onecartbackend-jbgj.onrender.com/product/list");
      console.log("🔥 Product List Response:", res.data);
      setlist(res.data);
    } catch (error) {
      console.error("❌ Error fetching product list:", error);
    } finally {
      setloading(false);
    }
  };

  // 🗑️ Remove product with confirmation
  const handleRemove = async (id, name) => {
    const confirmRemove = window.confirm(`⚠️ Are you sure you want to remove "${name}"?`);
    if (!confirmRemove) return; // If user clicks cancel, stop here

    try {
      await axios.post(`https://onecartbackend-jbgj.onrender.com/product/remove/${id}`);
      setlist((prev) => prev.filter((item) => item._id !== id));
      alert("🗑️ Product removed successfully!");
    } catch (error) {
      console.error("🔥 Remove Error:", error);
      alert("❌ Failed to remove product");
    }
  };

  useEffect(() => {
    handlelist();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex">
      {/* Sidebar */}
      <SideBar />

      {/* Product List Section */}
      <div className="flex-1 py-10 px-5 md:px-10 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center text-white">
          All Listed Products
        </h1>

        {/* Loader */}
        {loading && (
          <div className="text-center text-gray-300 text-lg">Loading...</div>
        )}

        {/* No Product Found */}
        {!loading && list.length === 0 && (
          <div className="text-center text-gray-400 text-lg">
            😢 No product found
          </div>
        )}

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-[#121212]/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col"
            >
              {/* Image */}
              {item.image1 ? (
                <img
                  src={item.image1.url || item.image1}
                  alt={item.name}
                  className="w-full h-[220px] object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-[220px] bg-[#1f1f1f] flex items-center justify-center text-gray-500 rounded-xl mb-4">
                  No Image
                </div>
              )}

              {/* Details */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-bold capitalize">{item.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.category || "Unknown Category"}
                  </p>
                  <p className="text-[#00FF7F] text-lg font-semibold mt-2">
                    ${item.price}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    <span className="text-gray-300">Subcategory:</span>{" "}
                    {item.subcategory || "N/A"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-gray-300">Sizes:</span>{" "}
                    {item.sizes?.join(", ") || "N/A"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-gray-300">Bestseller:</span>{" "}
                    {item.bestseller ? "✅ Yes" : "❌ No"}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Added: {new Date(item.date).toLocaleString()}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id, item.name)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-300"
                >
                  Remove Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
