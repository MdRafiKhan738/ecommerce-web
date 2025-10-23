import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/E-commerce MERN Assets/vcart logo.png";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-full z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* 🌌 Animated Galaxy Background */}
      <motion.div
        className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_#001122_0%,_#000000_100%)]"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      {/* ✨ Floating star field */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#4c8fff] rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random(),
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 3,
          }}
        ></motion.div>
      ))}

      {/* 🪐 Rotating Energy Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="relative w-[250px] h-[250px] flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute w-[320px] h-[320px] rounded-full border-t-[5px] border-[#00ffd5] border-b-[5px] border-b-transparent blur-[1.5px] shadow-[0_0_25px_#00ffd5]"
        ></motion.div>

        {/* 🔥 Glowing rotating inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-[240px] h-[240px] rounded-full border-t-[4px] border-[#4c8fff] border-b-[4px] border-transparent blur-[1px]"
        ></motion.div>

        {/* ⚡ Pulsing VCart Logo */}
        <motion.img
          src={logo}
          alt="VCart"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.9, 1, 0.9],
            opacity: [0.8, 1, 0.8],
            filter: ["drop-shadow(0_0_10px_#00ffd5)", "drop-shadow(0_0_40px_#4c8fff)"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="w-[150px] h-[150px] object-contain"
        />
      </motion.div>

      {/* 🧬 Floating Energy Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-tr from-[#4c8fff90] to-[#00ffd580] rounded-full"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
          }}
        ></motion.div>
      ))}

      {/* 💬 Glitchy Text Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          y: [0, -3, 0],
          textShadow: [
            "0px 0px 10px #4c8fff",
            "0px 0px 25px #00ffd5",
            "0px 0px 10px #4c8fff",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="mt-[40px] text-[30px] font-bold uppercase tracking-[4px] text-white"
      >
        Spend less ,  <span className="text-[#00ffd5]"></span> Smile more....
      </motion.h1>

      {/* 🌈 Holographic Line Loader */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: ["0%", "90%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: "easeInOut",
        }}
        className="mt-[40px] h-[6px] bg-gradient-to-r from-[#4c8fff] via-[#00ffd5] to-[#4c8fff] rounded-full shadow-[0_0_30px_#00ffd5]"
      ></motion.div>
    </motion.div>
  );
};

export default Loader;
