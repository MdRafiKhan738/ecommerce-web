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
const Background = ({ herocount }) => {
  const images = [back1, back2, back3, back4]

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center ">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-in-out
            ${herocount === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{
            objectFit: "contain",     // full image visible, no crop
            objectPosition: "center", // center the image
          }}
        />
      ))}
    </div>
  )
}

export default Background
