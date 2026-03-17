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
    <div className="w-full flex flex-col overflow-x-hidden bg-white">

      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden group">
        <Background herocount={herocount} />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/10 hover:bg-black/30 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronLeft size={30} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/10 hover:bg-black/30 backdrop-blur-xl p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <FiChevronRight size={30} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setherocount(index)}
              className={`rounded-full transition-all duration-500 
              ${herocount === index ? "w-8 h-1.5 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="w-full py-20 px-4 md:px-10 lg:px-20">
        <Product />
      </section>

      {/* POLICY SECTION */}
      <section className="w-full bg-gray-50 py-24 px-4 md:px-10 lg:px-20">
        <OurPolicy />
      </section>

    </div>
  )
}

export default Home
