import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from "../assets/E-commerce MERN Assets/vcart logo.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative w-full bg-[#050b18] text-white overflow-hidden border-t border-blue-500/20">
      {/* Animated Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1400px] mx-auto pt-20 pb-10 px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <motion.img 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={logo} 
                alt="Logo" 
                className="h-12 w-auto drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]" 
              />
              <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ONE CART
              </h1>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Redefining the digital marketplace with premium products and lightning-fast logistics. Join the revolution of seamless shopping.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: '#3b82f6' }}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-900/30 border border-blue-500/20 text-blue-400 hover:text-white transition-all shadow-lg shadow-blue-500/5"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-4">Explore</h2>
            <ul className="space-y-4">
              {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 10 }}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer flex items-center gap-2 transition-colors"
                  onClick={() => window.location.href = `/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                >
                  <span className="h-[1px] w-4 bg-blue-500/50"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-4">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-gray-400 hover:text-blue-300 transition-colors group">
                <FaMapMarkerAlt className="mt-1 text-blue-500 group-hover:animate-bounce" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 hover:text-blue-300 transition-colors group">
                <FaPhoneAlt className="text-blue-500 group-hover:rotate-12" />
                <span>+880 1989678448</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 hover:text-blue-300 transition-colors group">
                <FaEnvelope className="text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="break-all">support@onecart.com</span>
              </div>
            </div>
          </motion.div>

          {/* Premium Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-4">Newsletter</h2>
            <p className="text-gray-400 text-sm">Unlock exclusive early access and secret drops.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#0a1628] border border-blue-500/20 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl transition-all flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-blue-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm"
        >
          <p>© 2026 <span className="text-blue-400 font-semibold">ONE CART</span> <p   onClick={() => window.location.href = `https://mdrafikhan.vercel.app`}> Dev By Md Rafi Khan</p></p>
          <div className="flex gap-8">
            <a href="/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/Termsofservice" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Bottom Glow Line */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
    </footer>
  );
};

export default Footer;
