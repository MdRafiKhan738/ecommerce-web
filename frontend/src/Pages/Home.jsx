import React, { useState, useEffect } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import Footer from '../component/Footer'

const Home = () => {
  const herodata = [
    { title: "Unleash Your Inner Style", subtitle: "Where Elegance Meets Confidence" },
    { title: "Your Trend Starts Here", subtitle: "Redefine Fashion, Redefine You" },
    { title: "Step Into The Spotlight", subtitle: "Luxury That Speaks Your Story" },
    { title: "Be Bold, Be You", subtitle: "Elevate Everyday Looks Instantly" }
  ]

  const [herocount, setherocount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setherocount(prev => (prev + 1) % herodata.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen flex flex-col">
      <div className="relative w-full h-[calc(100vh-64px)] mt-[64px] overflow-hidden">
        <Background herocount={herocount} />
        <Hero herodata={herodata[herocount]} herocount={herocount} setherocount={setherocount} />
      </div>
      <Product/>
      <div>


        <OurPolicy/>
      </div>
   
    </div>
   
  )
}

export default Home
