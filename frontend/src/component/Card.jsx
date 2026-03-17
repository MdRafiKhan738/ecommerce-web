import React, { useContext } from 'react'
import { shopdatacontext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(shopdatacontext)
let navigate=useNavigate()
  return (
    <div
      className="
        group relative w-[280px] sm:w-[300px] h-[420px]
        rounded-2xl overflow-hidden
        bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]
        border border-[#2b2b2b]
        shadow-[0_0_30px_rgba(0,255,255,0.05)]
        hover:shadow-[0_0_50px_rgba(0,255,255,0.2)]
        transform transition-all duration-500
        hover:scale-[1.03]
        cursor-pointer
      "
onClick={()=>navigate(`/productdetails/${id}`)}
    >
      {/* Product Image */}
      <div className="relative w-full h-[75%] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-700 ease-in-out
            group-hover:scale-110
          "
        />

        {/* Overlay on Hover */}
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            flex flex-col justify-end items-start p-4
          "
        >
          <h3 className="text-[#aefeff] text-lg font-semibold mb-2 tracking-wide drop-shadow-md">
            {name}
          </h3>
          <div className="text-white/90 text-sm mb-3">
            Premium Quality Collection
          </div>
          <button
            className="
              bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff40]
              backdrop-blur-md px-5 py-2 rounded-full text-sm
              hover:bg-[#00ffff]/40 transition-all duration-300
            " onClick={()=>navigate(`/productdetails/${id}`)}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Price & Info */}
      <div className="w-full h-[25%] flex flex-col justify-center px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[#e8fafa] font-semibold text-lg tracking-wide truncate max-w-[70%]">
            {name}
          </h2>
          <span
            className="
              bg-[#00ffff]/10 text-[#00ffff] font-semibold
              px-3 py-1 rounded-full text-sm backdrop-blur-sm
              border border-[#00ffff40]
            "
          >
            {currency} {price}
          </span>
        </div>
        <p className="text-[#b0b0b0] text-sm mt-1">  7 Days Return</p>
      </div>

      {/* Glow effect */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-tr from-[#00ffff10] to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        "
      ></div>
    </div>
  )
}

export default Card
