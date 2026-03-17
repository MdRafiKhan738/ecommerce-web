import React, { useState, useEffect } from 'react'
import Background from '../component/Background'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Home = () => {

  const [herocount, setherocount] = useState(0)
  const totalSlides = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setherocount(prev => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setherocount(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setherocount(prev => (prev + 1) % totalSlides)
  }

  return (
    <div className="w-screen flex flex-col bg-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[calc(100vh-64px)] mt-[64px] overflow-hidden group">

        {/* Background Banner */}
        <Background herocount={herocount} />

        {/* Dark Gradient Overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-10" />

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 cursor-pointer"
        >
          <FiChevronLeft size={30} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 cursor-pointer"
        >
          <FiChevronRight size={30} />
        </button>

        {/* DOT NAVIGATION */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20 shadow-2xl">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setherocount(index)}
              className={`transition-all duration-500 rounded-full cursor-pointer
              ${herocount === index
                  ? "w-10 h-1.5 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/60 text-xs animate-pulse">
          <span>Scroll</span>
          <div className="w-[1px] h-6 bg-white/40 mt-1"></div>
        </div>

      </div>

      {/* ================= PRODUCT ================= */}
      <section className="w-full py-20 px-4 md:px-10 lg:px-20 bg-white border-t border-gray-100">

        {/* Section Title */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <div className="h-[1px] flex-1 ml-6 bg-gray-200"></div>
        </div>

        <Product />

      </section>

      {/* ================= POLICY ================= */}
      <section className="w-full py-24 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">

        <OurPolicy />

      </section>

    </div>
  )
}

export default Home
