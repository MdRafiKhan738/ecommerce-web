// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane, FaUpload,
  FaUsers, FaClock, FaStar, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn
} from "react-icons/fa";
import heroDecor from "../assets/E-commerce MERN Assets/homedecor.png"; // floating decor image

const stagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 * i },
  }),
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  hover: { scale: 1.06, boxShadow: "0 25px 50px rgba(2,6,23,0.6)" },
};

const Contact = () => {
  const [counters, setCounters] = useState({ queries: 0, clients: 0, response: 0 });
  const [formData, setFormData] = useState({ first: "", last: "", email: "", phone: "", message: "", file: null });

  useEffect(() => {
    let q = 0, c = 0, r = 0;
    const targetQ = 5000, targetC = 2500, targetR = 7500;
    const step = 20;
    const ticks = 80;
    const incQ = Math.ceil(targetQ / ticks);
    const incC = Math.ceil(targetC / ticks);
    const incR = Math.ceil(targetR / ticks);
    const interval = setInterval(() => {
      q += incQ; c += incC; r += incR;
      if (q >= targetQ) q = targetQ;
      if (c >= targetC) c = targetC;
      if (r >= targetR) r = targetR;
      setCounters({ queries: q, clients: c, response: r });
      if (q === targetQ && c === targetC && r === targetR) clearInterval(interval);
    }, step);
  }, []);

  const testimonials = [
    { name: "John Doe", role: "CEO, TechCorp", msg: "One Cart support is unmatched!" },
    { name: "Jane Smith", role: "Marketing Lead", msg: "Super fast response and professional service." },
    { name: "Ali Khan", role: "Entrepreneur", msg: "Global reach and trusted support!" },
    { name: "Sara Lee", role: "CTO, DevWorld", msg: "Highly recommend for enterprise solutions!" },
  ];

  const faqs = [
    { q: "How fast is your response?", a: "We respond within 24 hours or less." },
    { q: "Can I upload files?", a: "Yes, attachments supported in the contact form." },
    { q: "Do you offer global support?", a: "Absolutely! We handle clients worldwide." },
    { q: "Payment issues?", a: "Our finance team will resolve queries within 12 hours." },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#071422] via-[#081728] to-[#0f2730] text-white antialiased overflow-x-hidden">

      {/* HERO */}
      <section className="relative w-full overflow-hidden py-32 px-6 max-w-[1600px] mx-auto">
        <motion.img src={heroDecor} alt="decor" className="absolute -top-20 -left-20 w-80 opacity-30 animate-spin-slow" />
        <motion.div className="relative z-10 text-center space-y-6" initial="hidden" whileInView="visible" variants={stagger}>
          <motion.h1 className="text-7xl lg:text-9xl font-extrabold text-teal-300" variants={cardAnim}>
            Contact <span className="text-white">Us</span>
          </motion.h1>
          <motion.p className="text-2xl lg:text-3xl text-white/80" variants={cardAnim}>
            Get in touch with our global support team 24/7. Fast, reliable, and professional.
          </motion.p>
        </motion.div>
      </section>

      {/* FORM + INFO + COUNTERS */}
      <section className="max-w-[1600px] mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FORM */}
        <motion.form className="bg-white/5 p-10 rounded-3xl border border-white/5 shadow-2xl space-y-6 lg:col-span-2" initial="hidden" whileInView="visible" variants={stagger}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="bg-white/10 px-4 py-3 rounded-xl w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400" value={formData.first} onChange={e => setFormData({...formData, first: e.target.value})} />
            <input type="text" placeholder="Last Name" className="bg-white/10 px-4 py-3 rounded-xl w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400" value={formData.last} onChange={e => setFormData({...formData, last: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="email" placeholder="Email" className="bg-white/10 px-4 py-3 rounded-xl w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone" className="bg-white/10 px-4 py-3 rounded-xl w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <textarea placeholder="Your Message" rows={5} className="bg-white/10 px-4 py-3 rounded-xl w-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer bg-white/10 px-4 py-3 rounded-xl hover:bg-white/20 transition w-full md:w-auto">
              <FaUpload className="text-teal-300 text-xl" /> Upload File
              <input type="file" className="hidden" onChange={e => setFormData({...formData, file: e.target.files[0]})} />
            </label>
            <button type="submit" className="bg-teal-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-[1.06] transition flex items-center gap-2 w-full md:w-auto"><FaPaperPlane /> Send Message</button>
          </div>
        </motion.form>

        {/* INFO + COUNTERS */}
        <motion.div className="space-y-12" initial="hidden" whileInView="visible" variants={stagger}>
          {/* Contact Info */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-2xl space-y-4">
            <h3 className="text-3xl font-semibold text-teal-300">Contact Info</h3>
            <p className="flex items-center gap-2"><FaPhone /> +880 1989678448</p>
            <p className="flex items-center gap-2"><FaEnvelope /> support@onecart.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Bandar Central, Narayanganj, Bangladesh</p>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5 shadow-lg">
              <FaUsers className="text-teal-300 text-5xl mb-2 mx-auto" />
              <div className="text-3xl font-bold">{counters.clients}</div>
              <div className="text-white/70 mt-1">Clients Served</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5 shadow-lg">
              <FaClock className="text-teal-300 text-5xl mb-2 mx-auto" />
              <div className="text-3xl font-bold">{counters.response}</div>
              <div className="text-white/70 mt-1">Response Hours</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5 shadow-lg">
              <FaPaperPlane className="text-teal-300 text-5xl mb-2 mx-auto" />
              <div className="text-3xl font-bold">{counters.queries}</div>
              <div className="text-white/70 mt-1">Queries Solved</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map */}
      <section className="max-w-[1600px] mx-auto px-6 mt-32">
        <motion.div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl" initial="hidden" whileInView="visible" variants={cardAnim}>
          <iframe
            title="office-map"
            className="w-full h-full rounded-3xl"
            src="https://maps.google.com/maps?q=bandar%20central%20narayanganj&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1600px] mx-auto px-6 mt-32">
        <motion.h2 className="text-6xl font-bold text-center text-teal-300 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}>
          What our clients say
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" variants={stagger}>
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={cardAnim} whileHover={{ scale: 1.06 }} className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-2xl text-center space-y-4">
              <FaStar className="text-yellow-400 text-4xl mx-auto" />
              <p className="text-white/80 italic">"{t.msg}"</p>
              <h4 className="text-xl font-semibold">{t.name}</h4>
              <p className="text-white/70 text-sm">{t.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1600px] mx-auto px-6 mt-32 mb-32">
        <motion.h2 className="text-6xl font-bold text-center text-teal-300 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}>
          Frequently Asked Questions
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" variants={stagger}>
          {faqs.map((f, i) => (
            <motion.div key={i} variants={cardAnim} whileHover={{ scale: 1.03 }} className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-2xl">
              <h4 className="text-xl font-semibold text-teal-300 mb-2">{f.q}</h4>
              <p className="text-white/80">{f.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
