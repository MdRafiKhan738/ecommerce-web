import React, { useState, useEffect } from 'react'
import Background from '../component/Background'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'

// Icons for the premium navigation
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { RxDotFilled } from 'react-icons/rx'

const Home = () => {
  const [herocount, setherocount] = useState(0)
  const totalSlides = 4 

  useEffect(() => {
    const interval = setInterval(() => {
      setherocount(prev => (prev + 1) % totalSlides)
    }, 6000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const prevSlide = () => {
    setherocount(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setherocount(prev => (prev + 1) % totalSlides)
  }

  return (
    <div className="w-full flex flex-col overflow-x-hidden bg-white">
      
      {/* 1. THE HERO BANNER: Full screen, no borders */}
      <section className="relative w-full h-[100vh] overflow-hidden group">
        <Background herocount={herocount} />

        {/* Navigation Arrows: Glassmorphism style */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-8 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/5 hover:bg-black/20 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
        >
          <FiChevronLeft size={30} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-8 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/5 hover:bg-black/20 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
        >
          <FiChevronRight size={30} />
        </button>

        {/* Minimalist Slide Progress Pill */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white/10 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/20 shadow-2xl">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setherocount(index)}
              className={`transition-all duration-700 ease-in-out rounded-full
                ${herocount === index ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </section>

      {/* 2. PRODUCT SECTION: Clean transition, no forced margins */}
      <main className="w-full py-20">
          <Product />
      </main>

      {/* 3. POLICY SECTION: Edge-to-edge subtle background */}
      <section className="w-full bg-gray-50/50 py-24 border-y border-gray-100">
          <OurPolicy />
      </section>

      {/* Footer is handled globally, so it's removed from here */}
    </div>
  )
}

export default Home
