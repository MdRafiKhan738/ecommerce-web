import React from 'react'
import back1 from "../assets/E-commerce MERN Assets/shirtwomen444.jpg"
import back2 from "../assets/E-commerce MERN Assets/pantwoman144.jpg"
import back3 from "../assets/E-commerce MERN Assets/t-shirtwomen3.jpg"
import back4 from "../assets/E-commerce MERN Assets/jacket for women1.jpg"
import back5 from "../assets/E-commerce MERN Assets/t-shirtman1.jpg"
import back6 from "../assets/E-commerce MERN Assets/t-shirtman2.jpg"
import back7 from "../assets/E-commerce MERN Assets/t-shirtman4.jpg"
import back8 from "../assets/E-commerce MERN Assets/t-shirtwomen2.jpg"
import back9 from "../assets/E-commerce MERN Assets/t-shirtwomen4.jpg"
import back10 from "../assets/E-commerce MERN Assets/kidswear44.jpg"
// Add your other imports here...

const Background = ({ herocount }) => {
  const images = [back1, back2, back3, back4]

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-100 flex items-center justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-out origin-center
            ${herocount === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-110"}`}
        >
          {/* Dynamic Blurred Background Layer for a premium fill */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30"
            style={{ backgroundImage: `url(${img})` }}
          ></div>

          {/* Main Focused Image */}
          <img
            src={img}
            alt={`slide-${index}`}
            className="absolute inset-0 w-full h-full object-contain object-center drop-shadow-2xl"
          />
          
          {/* Subtle vignette gradient so navigation icons pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>
        </div>
      ))}
    </div>
  )
}

export default Background
