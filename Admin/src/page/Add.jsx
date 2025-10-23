import React, { useState } from 'react'
import Nav from '../componets/Nav'
import SideBar from "../componets/SideBar.jsx"
import upload from "../assets/uploadimg.png"
import axios from 'axios'

const Add = () => {
  const [images, setImages] = useState([null, null, null, null])
  const [Name, setName] = useState("")
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("Men")
  const [subcategory, setsubcategory] = useState("TopWear")
  const [price, setprice] = useState("")
  const [bestseller, setbestseller] = useState(false)
  const [sizes, setsizes] = useState([])

  const [success, setSuccess] = useState(false)
  const [createdProduct, setCreatedProduct] = useState(null)

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages[index] = null
    setImages(newImages)
  }

  const handleaddproduct = async (e) => {
    e.preventDefault()
    try {
      let formdata = new FormData()
      formdata.append("name", Name)
      formdata.append("description", description)
      formdata.append("category", category)
      formdata.append("subcategory", subcategory)
      formdata.append("bestseller", bestseller)
      formdata.append("price", price)
      formdata.append("sizes", JSON.stringify(sizes))
      images.forEach((img, i) => {
        if (img) formdata.append(`image${i + 1}`, img)
      })

      const result = await axios.post("http://localhost:5000/product/addproduct", formdata, { withCredentials: true })
      if (result.data) {
        setSuccess(true)
        setCreatedProduct(result.data)

        // Reset form
        setName("")
        setdescription("")
        setcategory("Men")
        setsubcategory("TopWear")
        setbestseller(false)
        setImages([null, null, null, null])
        setprice("")
        setsizes([])
      }
    } catch (error) {
      console.error("❌ Add product error:", error)
    }
  }

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL"]

  // Enhanced structured categories
  const categories = {
    Men: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Shorts", "Jackets", "Hoodies", "Coats", "Sweaters", "Footwear", "Accessories"],
    Women: ["Dresses", "Tops", "Skirts", "Jeans", "Leggings", "Sweaters", "Hoodies", "Jackets", "Coats", "Footwear", "Accessories"],
    Kids: ["T-Shirts", "Shirts", "Shorts", "Dresses", "Sweaters", "Footwear", "Toys & Baby"],
    Electronics: ["Smartphones", "Laptops", "Tablets", "Headphones", "Speakers", "Cameras", "Smartwatches", "Gaming Consoles", "PC Components", "Drones"],
    Home: ["Furniture", "Beds", "Sofas", "Chairs", "Tables", "Wardrobes", "Cabinets", "Shelves", "Outdoor Furniture", "Home Appliances", "Kitchen Appliances"],
    Beauty: ["Skincare", "Hair Care", "Makeup", "Fragrances", "Oral Care", "Shaving & Grooming", "Bath & Body", "Wellness Devices", "Health Supplements"],
    Sports: ["Fitness", "Outdoor Sports", "Indoor Games", "Cycling", "Swimming", "Yoga", "Camping", "Hiking", "Team Sports"],
    Books: ["Fiction", "Non-Fiction", "Comics", "Educational", "Self Help", "Biographies", "Children Books", "Cookbooks", "Travel Guides"],
    Automotive: ["Car Accessories", "Motorcycle Accessories", "Tools", "Tyres", "Lubricants", "Car Electronics", "GPS Devices", "Batteries", "Car Care"],
    Toys: ["Action Figures", "Dolls", "Educational Toys", "Puzzles", "Board Games", "Baby Clothing", "Baby Gear", "Strollers", "Car Seats"]
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-bl from-[#0a0a0a] via-[#111827] to-[#000] text-white overflow-x-hidden relative'>
      <Nav />
      <SideBar />
      <div className='md:ml-[18%] w-[100%] md:w-[82%] h-full flex flex-col justify-start py-[60px] px-[20px] gap-[20px]'>

        {/* ✅ Success message */}
        {success && createdProduct && (
          <div className='bg-green-600/80 backdrop-blur-lg p-6 rounded-xl shadow-xl text-black flex flex-col gap-3'>
            <h2 className='text-2xl font-bold'>✅ Product Added Successfully!</h2>
            <p><strong>Name:</strong> {createdProduct.name}</p>
            <p><strong>Description:</strong> {createdProduct.description}</p>
            <p><strong>Category:</strong> {createdProduct.category} / {createdProduct.subcategory}</p>
            <p><strong>Price:</strong> ${createdProduct.price}</p>
            <p><strong>Bestseller:</strong> {createdProduct.bestseller ? "Yes" : "No"}</p>
            <p><strong>Sizes:</strong> {createdProduct.sizes.join(", ")}</p>
            <div className='flex gap-2 mt-2'>
              {[createdProduct.image1, createdProduct.image2, createdProduct.image3, createdProduct.image4].map((img, i) => (
                img && <img key={i} src={img} alt={`Product ${i}`} className='w-[70px] h-[70px] object-cover rounded-lg' />
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleaddproduct} className='w-full max-w-[900px] bg-[#1c1f26]/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-[30px] md:p-[60px] flex flex-col gap-[30px] border border-white/10 transition-all duration-300'>
          <h1 className='text-[28px] md:text-[40px] font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#46d1f7] to-[#65f7b3] drop-shadow-md'> Add Product Page </h1>

          {/* Upload Images */}
          <div className='flex flex-col gap-[15px]'>
            <h1 className='text-[20px] md:text-[25px] font-semibold'>Upload Images</h1>
            <div className='flex flex-wrap gap-[15px]'>
              {images.map((img, i) => (
                <div key={i} className='relative w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-xl shadow-lg overflow-hidden'>
                  <img src={!img ? upload : URL.createObjectURL(img)} alt="" className='w-full h-full object-cover cursor-pointer' />
                  {img && (
                    <button type="button" onClick={() => removeImage(i)} className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold cursor-pointer'>❌</button>
                  )}
                  <input type="file" className='absolute inset-0 opacity-0 cursor-pointer' onChange={e => handleImageChange(i, e.target.files[0])} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className='flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input type="text" placeholder='Product Name' className='w-full md:w-[600px] h-[45px] rounded-lg bg-[#2d3748] border-2 border-transparent hover:border-[#46d1f7] px-[20px] text-[18px] focus:outline-none transition-all duration-200' onChange={(e) => setName(e.target.value)} value={Name} required />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea placeholder='Product Description' className='w-full md:w-[600px] h-[100px] rounded-lg bg-[#2d3748] border-2 border-transparent hover:border-[#46d1f7] px-[20px] py-[10px] text-[18px] focus:outline-none transition-all duration-200' onChange={(e) => setdescription(e.target.value)} value={description} required />
          </div>

          {/* Category & Subcategory */}
          <div className='flex flex-wrap gap-[20px]'>
            <div className='flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Category</p>
              <select className='bg-[#2d3748] w-[200px] px-[10px] py-[8px] rounded-lg border-2 border-transparent hover:border-[#46d1f7] transition-all duration-200' onChange={(e) => { setcategory(e.target.value); setsubcategory(categories[e.target.value][0]) }} value={category} required>
                {Object.keys(categories).map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub Category</p>
              <select className='bg-[#2d3748] w-[200px] px-[10px] py-[8px] rounded-lg border-2 border-transparent hover:border-[#46d1f7] transition-all duration-200' onChange={(e) => setsubcategory(e.target.value)} value={subcategory} required>
                {categories[category].map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className='flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input type="number" placeholder='$' className='w-full md:w-[600px] h-[45px] rounded-lg bg-[#2d3748] border-2 border-transparent hover:border-[#46d1f7] px-[20px] text-[18px] focus:outline-none transition-all duration-200' onChange={(e) => setprice(e.target.value)} value={price} required />
          </div>

          {/* Sizes */}
          <div className='flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Sizes</p>
            <div className='flex flex-wrap gap-[10px]'>
              {sizeOptions.map((sz, i) => (
                <div key={i} className={`px-[18px] py-[8px] rounded-lg text-[17px] border-2 cursor-pointer transition-all duration-200 ${sizes.includes(sz) ? "bg-[#46d1f7] text-black border-[#65f7b3]" : "bg-[#2d3748] hover:border-[#46d1f7]"}`} onClick={() => setsizes(prev => prev.includes(sz) ? prev.filter(item => item !== sz) : [...prev, sz])}>
                  {sz}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className='flex items-center gap-[10px]'>
            <input type="checkbox" id='checkbox' className='w-[22px] h-[22px] cursor-pointer accent-[#46d1f7]' onChange={() => setbestseller(prev => !prev)} />
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold'>Add To Best Seller</label>
          </div>

          {/* Submit */}
          <button type="submit" className='mt-[10px] w-[180px] py-[12px] rounded-xl bg-gradient-to-r from-[#46d1f7] to-[#65f7b3] text-black text-[20px] font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
