import React, { useContext } from 'react'
import { shopdatacontext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Card = ({ name, image, image2, id, price }) => {
  const { currency } = useContext(shopdatacontext)
  const navigate = useNavigate()

  // Handle cases where image might be an array (e.g., image[0], image[1]) or separate props
  const primaryImg = Array.isArray(image) ? image[0] : image


  return (
    <div
      onClick={() => navigate(`/productdetails/${id}`)}
      className="
        group relative w-[280px] sm:w-[300px] h-[420px]
        rounded-2xl overflow-hidden
        bg-gradient-to-b from-[#1a1a1a]/80 to-[#0d0d0d]/90
        backdrop-blur-xl border border-[#ffffff10]
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        hover:shadow-[0_0_40px_rgba(0,255,255,0.1)]
        hover:border-[#00ffff]/30
        transform transition-all duration-500 ease-out
        hover:-translate-y-1
        cursor-pointer
        flex flex-col
      "
    >
      {/* Product Image Container */}
      <div className="relative w-full h-[75%] overflow-hidden bg-[#0a0a0a]">
        {/* Primary Image */}
        <img
          src={primaryImg}
          alt={name}
          className="
            absolute inset-0 w-full h-full object-cover
            transition-all duration-700 ease-in-out
            group-hover:scale-105
            opacity-100 group-hover:opacity-0
          "
        />
        
        
        
      </div>

      {/* Details Section (Clean, spatial layout) */}
      <div className="w-full h-[25%] flex flex-col justify-between px-5 py-4 z-10 relative">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#f5f5f7] font-medium text-[17px] tracking-wide truncate w-full">
            {name}
          </h2>
          <p className="text-[#86868b] text-xs font-light tracking-wider uppercase">
            Premium Collection
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#00ffff] font-semibold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">
            {currency} {price}
          </span>
          <span className="text-[10px] text-[#86868b] bg-[#ffffff08] px-2 py-1 rounded-md border border-[#ffffff10]">
            Free Delivery
          </span>
        </div>
      </div>

      {/* Subtle Spatial Glow */}
      <div
        className="
          absolute inset-0 pointer-events-none rounded-2xl
          bg-gradient-to-tr from-[#00ffff05] to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out
        "
      />
    </div>
  )
}

export default Card
