import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate for routing
import Tiitle from './Tiitle';
import { shopdatacontext } from '../context/ShopContext';
import { motion } from 'framer-motion';

const BestSeller = () => {
  const { product } = useContext(shopdatacontext);
  const [bestseller, setbestseller] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    if (product && product.length > 0) {
      const filterProduct = product.filter((item) => item.bestseller === true);
      // Increased to 10 so the slider has enough items to scroll through
      setbestseller(filterProduct.slice(0, 10));
    }
  }, [product]);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0f14] to-[#050505] py-[80px] overflow-hidden">
      {/* Background Decorative Neon Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#00ffff15] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-[#0088ff15] blur-[150px] rounded-full pointer-events-none"></div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <Tiitle text1={"Best"} text2={"Sellers"} />
        <p className="w-full text-[15px] md:text-[20px] px-[10px] text-[#00ffff] mt-2 font-light tracking-wide drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
          Tried, Tested & Loved — Discover Our All-Time Best Sellers
        </p>
      </motion.div>

      {/* Product Slider Container (Mobile Swipe / PC Scroll) */}
      <div className="w-full mt-[70px] px-[20px] md:px-[50px] relative z-10">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-[30px] md:gap-[50px] pb-[40px] pt-[20px] scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {
            bestseller.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-center shrink-0"
                /* ENTIRE CARD IS NOW CLICKABLE FOR MOBILE AND PC */
                onClick={() => navigate(`/product/${item._id || item.id}`)} 
              >
                <div
                  className="
                    group relative w-[280px] sm:w-[320px] h-[450px]
                    bg-[#0d131a] rounded-3xl overflow-hidden border border-[#00ffff20]
                    shadow-[0_0_20px_rgba(0,255,255,0.03)]
                    hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] hover:-translate-y-2
                    transition-all duration-500 cursor-pointer flex flex-col
                  "
                >
                  {/* Image Container */}
                  <div className="relative w-full h-[65%] overflow-hidden bg-[#050505]">
                    <motion.img
                      src={item.image1 || item.image[0]} // Failsafe for image data structures
                      alt={item.name}
                      className="w-full h-full object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Overlay - Keeps PC looking cool without breaking mobile */}
                    <div
                      className="
                        absolute inset-0 bg-gradient-to-t from-[#000000e6] via-[#00000080] to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        flex flex-col justify-end items-center pb-6
                      "
                    >
                      <button
                        className="
                          bg-transparent text-[#00ffff] border border-[#00ffff]
                          backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wider
                          hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_20px_#00ffff] transition-all duration-300
                          transform translate-y-4 group-hover:translate-y-0
                        "
                      >
                        View Product
                      </button>
                    </div>
                  </div>

                  {/* Bottom Info Details */}
                  <div className="p-5 flex flex-col justify-between h-[35%] bg-gradient-to-b from-[#0d131a] to-[#05080b]">
                    <div>
                      <div className="flex items-start justify-between w-full gap-2">
                        <h2 className="text-[#e8fafa] font-bold text-lg tracking-wide leading-tight line-clamp-2">
                          {item.name}
                        </h2>
                        <span
                          className="
                            bg-[#00ffff]/10 text-[#00ffff] font-bold
                            px-3 py-1 rounded-xl text-sm backdrop-blur-sm
                            border border-[#00ffff30] shrink-0
                            shadow-[0_0_10px_rgba(0,255,255,0.1)]
                          "
                        >
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-[#ffffff10]">
                      <p className="text-[#00ffff80] text-xs uppercase tracking-wider font-semibold">Exclusive</p>
                      <p className="text-[#b0b0b0] text-xs">Fast Delivery</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>

      {/* Hide Scrollbar CSS Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  )
}

export default BestSeller;
