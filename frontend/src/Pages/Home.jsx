import React, { useState, useEffect } from 'react'
import Background from '../component/Background'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import Footer from '../component/Footer'

// Importing icons for the premium navigation
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { RxDotFilled } from 'react-icons/rx'

const Home = () => {
  const [herocount, setherocount] = useState(0)
  const totalSlides = 4 // Make sure this matches the number of images in your Background component

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setherocount(prev => (prev + 1) % totalSlides)
    }, 6000) // Slightly faster for a modern feel
    return () => clearInterval(interval)
  }, [totalSlides])

  // Manual navigation controls
  const prevSlide = () => {
    setherocount(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setherocount(prev => (prev + 1) % totalSlides)
  }

  return (
    <div className="w-screen flex flex-col bg-white">
      
      {/* Banner Container - group class added for hover effects */}
      <div className="relative w-full h-[calc(100vh-64px)] mt-[64px] overflow-hidden group">
        <Background herocount={herocount} />

        {/* Left Arrow (Glassmorphism effect, appears on hover) */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronLeft size={32} />
        </button>

        {/* Right Arrow (Glassmorphism effect, appears on hover) */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronRight size={32} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 bg-black/20 backdrop-blur-md px-5 py-2 rounded-full">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setherocount(index)}
              className={`transition-all duration-300 ease-in-out flex items-center justify-center
                ${herocount === index ? "text-white scale-150" : "text-white/40 hover:text-white/80"}`}
            >
              <RxDotFilled size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
        <Product />
        <OurPolicy />
      </div>

      <Footer />
    </div>
  )
}

export default Home
