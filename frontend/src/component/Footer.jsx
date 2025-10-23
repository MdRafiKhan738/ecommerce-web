import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from "../assets/E-commerce MERN Assets/vcart logo.png";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white pt-16 px-6 ">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10" />
            <h1 className="text-xl font-bold">One Cart</h1>
          </div>
          <p className="text-white/80 text-sm">
            One Cart is your one-stop e-commerce solution providing high-quality products, fast delivery, and the best online shopping experience.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <p className="hover:text-teal-400 cursor-pointer transition" onClick={() => window.location.href = '/'}>Home</p>
          <p className="hover:text-teal-400 cursor-pointer transition" onClick={() => window.location.href = '/collection'}>Collection</p>
          <p className="hover:text-teal-400 cursor-pointer transition" onClick={() => window.location.href = '/about'}>About</p>
          <p className="hover:text-teal-400 cursor-pointer transition" onClick={() => window.location.href = '/contact'}>Contact</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-white/80 text-sm">📍 Dhaka,Bangladesh</p>
          <p className="text-white/80 text-sm">📞 +880 1989678448</p>
          <p className="text-white/80 text-sm">📧 Wonderfulnatuare@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Newsletter</h2>
          <p className="text-white/80 text-sm">Subscribe to get the latest updates and offers.</p>
          <div className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-full bg-white/10 placeholder:text-white text-white focus:outline-none"
            />
            <button className="bg-teal-500 px-6 py-2 rounded-r-full hover:bg-teal-400 transition">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/50 text-sm">
        © 2025 One Cart. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
