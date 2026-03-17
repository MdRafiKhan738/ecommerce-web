import React, { useState, useEffect } from 'react'
import Background from '../component/Background'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import Footer from '../component/Footer'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Home = () => {

  const [herocount, setherocount] = useState(0)
  const totalSlides = 4 // 🔥 control from backend later

  useEffect(() => {
    const interval = setInterval(() => {
      setherocount(prev => (prev + 1) % totalSlides)
    }, 6000)

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

      {/* ================= HERO SECTION (OLD STRUCTURE + NEW POWER) ================= */}
      <div className="relative w-full h-[calc(100vh-64px)] mt-[64px] overflow-hidden group">

        {/* 🔥 Banner Controlled Background */}
        <Background herocount={herocount} />

        {/* 🔥 LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/10 hover:bg-black/30 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronLeft size={30} />
        </button>

        {/* 🔥 RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/10 hover:bg-black/30 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronRight size={30} />
        </button>

        {/* 🔥 DOT NAVIGATION */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full border border-white/20">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setherocount(index)}
              className={`rounded-full transition-all duration-500 cursor-pointer
              ${herocount === index
                  ? "w-8 h-1.5 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

      </div>

      {/* ================= PRODUCT SECTION (NO RANDOM MT/MX) ================= */}
      <section className="w-full py-20 px-4 md:px-10 lg:px-20 border-t border-gray-100">
        <Product />
      </section>

      {/* ================= POLICY SECTION ================= */}
      <section className="w-full py-24 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <OurPolicy />
      </section>

  )
}

export default Home
