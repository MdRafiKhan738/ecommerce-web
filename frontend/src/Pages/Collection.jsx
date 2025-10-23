import React, { useContext, useState, useEffect } from "react";
import { FaAngleRight, FaChevronDown } from "react-icons/fa";
import Tiitle from "../component/Tiitle";
import { shopdatacontext } from "../context/ShopContext";
import Card from "../component/Card"; // Product card component

const Collection = () => {
  const { product, search } = useContext(shopdatacontext);

  const [showfilter, setshowfilter] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sorttype, setsorttype] = useState("relavent");

  // Ensure product is always an array
  useEffect(() => {
    setfilterproduct(Array.isArray(product) ? product : []);
  }, [product]);

  const togglecategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setcategory((prev) => [...prev, value]);
    }
  };

  const togglesubcategory = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setsubcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setsubcategory((prev) => [...prev, value]);
    }
  };

  const applyfilter = () => {
    let productcopy = Array.isArray(product) ? [...product] : [];

    // 🔍 Search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      productcopy = productcopy.filter(
        (item) =>
          item.name?.toLowerCase().includes(lowerSearch) ||
          item.category?.toLowerCase().includes(lowerSearch) ||
          item.subcategory?.toLowerCase().includes(lowerSearch)
      );
    }

    // 🏷 Category filter
    if (category.length > 0) {
      productcopy = productcopy.filter((item) =>
        category.includes(item.category || "")
      );
    }

    // 📂 Subcategory filter
    if (subcategory.length > 0) {
      productcopy = productcopy.filter((item) =>
        subcategory.includes(item.subcategory || "")
      );
    }

    // 📈 Sorting
    if (sorttype === "Low-High") {
      productcopy.sort((a, b) => a.price - b.price);
    } else if (sorttype === "High-Low") {
      productcopy.sort((a, b) => b.price - a.price);
    }

    setfilterproduct(productcopy);
  };

  useEffect(() => {
    applyfilter();
  }, [category, subcategory, sorttype, search, product]);

  // 🔹 Huge category & subcategory list (infinite expandable)
  const allCategories = [
    "Men", "Women", "Kids", "Teen", "Books", "Sports & Fitness",
    "Toys & Baby", "Automotive", "Beauty & PersonalCare", "Furniture",
    "Home & Kitchen", "Electronics", "Accessories", "Clothing & Apparel",
  ];

  const allSubCategories = [
    "T-Shirts","Shirts","Jeans","Trousers","Shorts","Skirts","Dresses",
    "Sweaters","Hoodies","Jackets","Coats","Activewear","Sportswear",
    "Nightwear","Innerwear","Socks","Footwear","Sandals","Sneakers","Boots",
    "Watches","Jewelry","Bags","Backpacks","Wallets","Belts","Hats","Sunglasses",
    "Scarves","Gloves","Smartphones","Laptops","Tablets","Headphones","Speakers",
    "Smartwatches","Cameras","Drones","Gaming Consoles","PC Components",
    "Home Appliances","Kitchen Appliances","Vacuum Cleaners","Air Conditioners",
    "Heaters","Refrigerators","Microwaves","Water Purifiers","Fans","Ironing Appliances",
    "Furniture","Beds","Sofas","Chairs","Tables","Wardrobes","Cabinets","Shelves",
    "Desks","Outdoor Furniture","Beauty & Personal Care","Skincare","Hair Care",
    "Makeup","Fragrances","Oral Care","Shaving & Grooming","Bath & Body",
    "Health Supplements","Wellness Devices","Books","Fiction","Non-Fiction",
    "Comics","Educational","Self Help","Biographies","Children Books","Cookbooks",
    "Travel Guides","Sports","Fitness","Outdoor Sports","Indoor Games","Cycling",
    "Swimming","Yoga","Camping","Hiking","Team Sports","Toys & Baby Products",
    "Action Figures","Dolls","Educational Toys","Puzzles","Board Games",
    "Baby Clothing","Baby Gear","Strollers","Car Seats","Automotive",
    "Car Accessories","Motorcycle Accessories","Tools","Tyres","Lubricants",
    "Car Electronics","GPS Devices","Batteries","Car Care",
  ];

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2]">

      {/* Sidebar Filter */}
      <div className="md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] p-[20px] border-r border-gray-400 text-teal-500 lg:fixed">
        <p
          className="text-[25px] font-bold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setshowfilter((prev) => !prev)}
        >
          Filters
          {!showfilter ? <FaAngleRight className="mt-2" /> : <FaChevronDown className="mt-2" />}
        </p>

        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 transition-all duration-300 ${
            showfilter ? "block" : "hidden md:block"
          }`}
        >
          <p className="text-[18px] text-teal-300 mb-2">Categories</p>
          <div className="flex flex-col gap-[10px]">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-[10px] text-[16px] font-semibold">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={togglecategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <p className="text-[18px] text-teal-300 mt-6 mb-2">Sub-Categories</p>
          <div className="flex flex-col gap-[10px]">
            {allSubCategories.map((sub) => (
              <label key={sub} className="flex items-center gap-[10px] text-[16px] font-semibold">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={togglesubcategory}
                  checked={subcategory.includes(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="lg:pl-[20%] md:py-[10px] w-full">
        <div className="md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px] items-center">
          <Tiitle text1={"All"} text2={"Collections"} />
          <select
            onChange={(e) => setsorttype(e.target.value)}
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-[2px]"
          >
            <option value="relavent">Sort By Relevant</option>
            <option value="Low-High">Sort By Low to High</option>
            <option value="High-Low">Sort By High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] p-[20px]">
          {filterproduct.length > 0 ? (
            filterproduct.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-gray-400 text-[20px] font-semibold">
              No Products Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
