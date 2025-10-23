import React from 'react'
import { FaCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const Hero = ({ herodata, herocount, setherocount }) => {

  const handlePrev = () => {
    setherocount(prev => prev === 0 ? 3 : prev - 1)
  }

  const handleNext = () => {
    setherocount(prev => (prev + 1) % 4)
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center z-30 text-center overflow-hidden">

      {/* Hero Text Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={herodata.title}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="px-5"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            {herodata.title}
          </h1>
          <p className="text-white/90 text-xl md:text-3xl mt-4 drop-shadow-md font-light tracking-wide">
            {herodata.subtitle}
          </p>
          <button className="mt-8 px-8 py-3 text-lg bg-gradient-to-r from-amber-400 to-pink-500 text-black font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
            Explore Now
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 flex gap-4">
        {[0, 1, 2, 3].map(i => (
          <FaCircle
            key={i}
            className={`w-3.5 h-3.5 cursor-pointer transition-all duration-300 ${herocount === i ? "fill-amber-400 scale-125" : "fill-gray-400 hover:fill-white"}`}
            onClick={() => setherocount(i)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl hover:text-amber-400 transition-all duration-300 z-40"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl hover:text-amber-400 transition-all duration-300 z-40"
      >
        <FaChevronRight />
      </button>

    </div>
  )
}

export default Hero
