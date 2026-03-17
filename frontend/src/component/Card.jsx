import React, { useContext } from 'react'
import { shopdatacontext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Card = ({ name, image1, image2, id, price }) => {
  const { currency } = useContext(shopdatacontext)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/productdetails/${id}`)}
      className="
        group relative w-[280px] sm:w-[320px] h-[450px]
        rounded-3xl overflow-hidden
        bg-[#0a0a0a] border border-[#ffffff0a]
        hover:border-[#00ffff50]
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        cursor-pointer select-none
        shadow-[0_20px_50px_rgba(0,0,0,0.3)]
      "
    >
      {/* Visual Container: Image Crossfade */}
      <div className="relative w-full h-[78%] overflow-hidden">
        {/* Main Image */}
        <img
          src={image1}
          alt={name}
          className="
            absolute inset-0 w-full h-full object-cover
            transition-all duration-1000 ease-in-out
            group-hover:scale-110 group-hover:opacity-0
          "
        />
        
        {/* Hover Image (Image 2) */}
        <img
          src={image2 || image1} // Fallback to image1 if 2 is missing
          alt={`${name} perspective`}
          className="
            absolute inset-0 w-full h-full object-cover
            transition-all duration-1000 ease-in-out
            scale-110 group-hover:scale-100
            opacity-0 group-hover:opacity-100
          "
        />

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="
            bg-black/40 backdrop-blur-md text-[#00ffff] text-[10px] 
            font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full
            border border-[#00ffff30]
          ">
            New Arrival
          </span>
        </div>
      </div>

      {/* Content Section: OneCart Pro Aesthetic */}
      <div className="
        absolute bottom-0 w-full h-[22%] 
        bg-gradient-to-t from-black via-black/90 to-transparent
        flex flex-col justify-end px-6 pb-6
      ">
        <div className="flex flex-col gap-0.5">
          <h2 className="
            text-white font-medium text-[15px] 
            tracking-tight leading-tight truncate 
            group-hover:text-[#00ffff] transition-colors duration-500
          ">
            {name}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-[#888] text-[11px] uppercase tracking-widest font-light">
                Price
              </span>
              <span className="text-[#00ffff] font-bold text-xl tracking-tighter">
                {currency}{price}
              </span>
            </div>
            
            {/* Interactive 'Add' visual (Static but high-end looking) */}
            <div className="
              w-10 h-10 rounded-full border border-[#ffffff20] 
              flex items-center justify-center
              group-hover:bg-[#00ffff] group-hover:border-[#00ffff]
              transition-all duration-500
            ">
              <svg 
                width="16" height="16" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white group-hover:text-black transition-colors duration-500"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Spatial Overlay Glow */}
      <div className="
        absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.08),transparent_70%)]
        opacity-0 group-hover:opacity-100 transition-opacity duration-1000
      "/>
    </div>
  )
}

export default Card
