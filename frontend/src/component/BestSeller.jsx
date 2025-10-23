import React, { useContext, useEffect, useState } from 'react'
import Tiitle from './Tiitle'
import { shopdatacontext } from '../context/ShopContext'
import Card from './Card'
import { motion } from 'framer-motion'

const BestSeller = () => {
  const { product } = useContext(shopdatacontext)
  const [bestseller, setbestseller] = useState([])

  useEffect(() => {
    if (product && product.length > 0) {
      const filterProduct = product.filter((item) => item.bestseller === true)
      setbestseller(filterProduct.slice(0, 3))
    }
  }, [product])

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#0b0b0b] via-[#0f0f0f] to-[#1a1a1a] py-[80px] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-[#00ffff25] blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] bg-[#ff00ff20] blur-[150px] rounded-full"></div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <Tiitle text1={"Best"} text2={"Sellers"} />
        <p className="w-full text-[15px] md:text-[20px] px-[10px] text-blue-400 mt-2">
          Tried, Tested & Loved — Discover Our All-Time Best Sellers
        </p>
      </motion.div>

      {/* Product Cards */}
      <div className="w-full flex flex-wrap justify-center items-center gap-[50px] mt-[70px] px-[20px] relative z-10">
        {
          bestseller.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div
                className="
                  group relative w-[280px] sm:w-[300px] h-[420px]
                  bg-gradient-to-b from-[#121212] to-[#0a0a0a]
                  rounded-2xl overflow-hidden border border-[#2b2b2b]
                  shadow-[0_0_25px_rgba(0,255,255,0.05)]
                  hover:shadow-[0_0_45px_rgba(0,255,255,0.3)]
                  transition-all duration-500 cursor-pointer
                "
              >
                {/* Image with hover zoom */}
                <div className="relative w-full h-[75%] overflow-hidden">
                  <motion.img
                    src={item.image1}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-t-2xl"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay content */}
                  <div
                    className="
                      absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                      opacity-0 group-hover:opacity-100 transition-all duration-500
                      flex flex-col justify-end p-5
                    "
                  >
                    <h3 className="text-[#aefeff] text-lg font-semibold mb-1 tracking-wide">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">Exclusive Bestseller Item</p>
                    <button
                      className="
                        bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff40]
                        backdrop-blur-md px-5 py-2 rounded-full text-sm
                        hover:bg-[#00ffff]/40 transition-all duration-300
                      "
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="p-4 flex flex-col items-start justify-center h-[25%]">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-[#e8fafa] font-semibold text-lg tracking-wide truncate max-w-[70%]">
                      {item.name}
                    </h2>
                    <span
                      className="
                        bg-[#00ffff]/10 text-[#00ffff] font-semibold
                        px-3 py-1 rounded-full text-sm backdrop-blur-sm
                        border border-[#00ffff40]
                      "
                    >
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-[#b0b0b0] text-sm mt-1">Free Delivery • 7 Days Return</p>
                </div>
              </div>
            </motion.div>
          ))
        }
      </div>
    </section>
  )
}

export default BestSeller
