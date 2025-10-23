// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaBolt,
  FaHeadset,
  FaTruck,
  FaLock,
  FaMedal,
  FaTags,
  FaGlobeAmericas,
  FaAward,
  FaCogs,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import logo from "../assets/E-commerce MERN Assets/vcart logo.png";
import team1 from "../assets/E-commerce MERN Assets/amazon1.png";
import team2 from "../assets/E-commerce MERN Assets/temu.png";
import team3 from "../assets/E-commerce MERN Assets/flipcart1.png";

/**
 * About.jsx (SUPER HUGE VERSION)
 * - Nav/Footer removed (as requested)
 * - Original content preserved and expanded massively
 * - Many new interactive sections added:
 *   - Expanded Hero with animated headline shards
 *   - Counters (more smooth and animated)
 *   - Mission & Vision with decorative motion
 *   - Why Choose (retained + expanded)
 *   - Big Milestones timeline (expanded)
 *   - Global presence visual strip (map-like decorative)
 *   - Partners / Team detailed with bios & hover effects
 *   - Awards + Badge carousel (simple animated badges)
 *   - Testimonials carousel (framer-motion)
 *   - Technology & innovation (stack chips + animated bars)
 *   - Accessibility / CSR / Sustainability mini-section
 *   - CTA / Legacy expanded
 *
 * Notes:
 * - Keep asset paths as-is. If any asset missing, replace with placeholders.
 * - Tailwind classes used extensively (as original). Add/adjust Tailwind config if needed.
 */

/* motion variants */
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
  hover: { scale: 1.03, boxShadow: "0 20px 40px rgba(2,6,23,0.6)" },
};

const shardAnim = {
  initial: { opacity: 0, y: 40, rotate: -6 },
  animate: (i = 0) => ({ opacity: 1, y: 0, rotate: 0, transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" } }),
};

const About = () => {
  // Animated counters
  const [productsSold, setProductsSold] = useState("0");
  const [happyCustomers, setHappyCustomers] = useState("0");
  const [ordersDelivered, setOrdersDelivered] = useState("0");
  const ctrControls = useAnimation();

  useEffect(() => {
    // start counters when page loads (you can tie to viewport with intersection observer)
    async function runCounters() {
      await ctrControls.start("visible");
      // smooth increment (longer ticks so it's visible)
      let ps = 0,
        hc = 0,
        od = 0;
      const targetPs = 50000;
      const targetHc = 20000;
      const targetOd = 100000;
      const step = 150; // ms
      const ticks = 80;
      const incPs = Math.ceil(targetPs / ticks);
      const incHc = Math.ceil(targetHc / ticks);
      const incOd = Math.ceil(targetOd / ticks);

      const interval = setInterval(() => {
        ps += incPs;
        hc += incHc;
        od += incOd;
        if (ps >= targetPs) ps = targetPs;
        if (hc >= targetHc) hc = targetHc;
        if (od >= targetOd) od = targetOd;
        setProductsSold(ps.toLocaleString());
        setHappyCustomers(hc.toLocaleString());
        setOrdersDelivered(od.toLocaleString());
        if (ps === targetPs && hc === targetHc && od === targetOd) {
          clearInterval(interval);
        }
      }, step);
    }
    runCounters();
    // eslint-disable-next-line
  }, []);

  const whychoose = [
    {
      icon: <FaBolt />,
      title: "Lightning Fast Delivery",
      desc: "Same-day & 24-hour delivery options across many locations.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payments",
      desc: "Top-grade encryption and fraud protection on every checkout.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Human support — phone, chat & email — whenever you need help.",
    },
    {
      icon: <FaTruck />,
      title: "Wide Shipping Network",
      desc: "Global & local logistic partners to reach your doorstep safely.",
    },
    {
      icon: <FaMedal />,
      title: "Quality Guarantee",
      desc: "Strict QA checks & verified sellers for consistent quality.",
    },
    {
      icon: <FaTags />,
      title: "Best Price Promise",
      desc: "Competitive pricing, deals & price match offers.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      desc: "One Cart started with a tiny team & a huge dream — to simplify online shopping.",
    },
    {
      year: "2021",
      title: "Scale Up",
      desc: "Reached 10k+ customers, mobile app launched, seller onboarding begins.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      desc: "Expanded catalog internationally & partnered with multiple couriers.",
    },
    {
      year: "2023",
      title: "1M Orders",
      desc: "Crossed 1 million orders — trust & scale amplified.",
    },
    {
      year: "2024",
      title: "Marketplace",
      desc: "Launched 100k+ sellers marketplace with verified listings.",
    },
    {
      year: "2025",
      title: "Industry Leader",
      desc: "One Cart became a top-tier global e-commerce destination.",
    },
  ];

  const partners = [
    { img: team1, name: "Amazon", role: "Strategic Partner" },
    { img: team2, name: "Temu", role: "Logistics Partner" },
    { img: team3, name: "Flipcart", role: "Marketplace Partner" },
  ];

  // Testimonials for carousel
  const testimonials = [
    { text: "Amazing service! My product arrived in just one day.", author: "Sara K." },
    { text: "Super secure payment process, love the experience.", author: "Daniel P." },
    { text: "Quality products and fast delivery — highly recommended!", author: "Rita M." },
    { text: "Customer support resolved my issue in minutes — incredible.", author: "Arjun S." },
  ];

  // Tech stack (for animated bars / chips)
  const techStack = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Redis", level: 70 },
    { name: "Cloud CDN", level: 88 },
    { name: "Kubernetes", level: 65 },
  ];

  // small helper for testimonial carousel index
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const tInterval = setInterval(() => {
      setTIndex((i) => (i + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(tInterval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#071422] via-[#081728] to-[#0f2730] text-white antialiased">
      <main className="pt-6 pb-28">
        {/* HERO (expanded, shard headline, CTA cluster, large visual area) */}
        <section className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <motion.div initial="initial" whileInView="animate" viewport={{ once: false }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
                  <div>
                    <h3 className="text-lg font-semibold">One Cart</h3>
                    <p className="text-xs text-white/60">Trusted e-commerce — premium experience</p>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="flex flex-wrap -mx-2">
                    {["We build", "world-class", "shopping experiences."].map((word, i) => (
                      <motion.h1
                        key={i}
                        custom={i}
                        variants={shardAnim}
                        className={`text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight ${i === 1 ? "text-teal-300" : "text-white"} mr-2`}
                      >
                        {word}
                      </motion.h1>
                    ))}
                  </div>
                </div>

                <motion.p className="text-white/80 text-base sm:text-lg mt-4 max-w-2xl">
                  One Cart is built for speed, trust & delight. From lightning-fast delivery to verified sellers,
                  we obsess over every detail so your customers can shop confidently. Our platform merges cutting-edge
                  tech with a human-first approach.
                </motion.p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <motion.button whileHover={{ scale: 1.03 }} className="bg-teal-400 text-black px-6 py-3 rounded-full font-medium">Shop Now</motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} className="border border-white/20 px-6 py-3 rounded-full text-white/90 hover:bg-white/5 transition">Learn More</motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-3 rounded-full bg-white/5 border border-white/7 text-sm">Become a Seller</motion.button>
                </div>

                {/* CTA stats strip */}
                <motion.div className="flex gap-4 mt-8 flex-wrap" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <div className="bg-white/5 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-white/80">Products</div>
                    <div className="text-2xl font-bold text-teal-300">{productsSold}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-white/80">Happy Customers</div>
                    <div className="text-2xl font-bold text-teal-300">{happyCustomers}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-white/80">Orders Delivered</div>
                    <div className="text-2xl font-bold text-teal-300">{ordersDelivered}</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-gradient-to-br from-[#02151a] to-[#052a2a] p-6">
              {/* floating decorative items */}
              <motion.div
                className="absolute -left-14 -top-10 w-56 h-56 rounded-full bg-gradient-to-tr from-[#2dd4bf] to-[#06b6d4] opacity-30 blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              />
              <motion.img
                src={logo}
                alt="onecart"
                className="relative max-w-[260px] mx-auto object-contain"
                initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.8 } }}
              />
              <motion.div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-gradient-to-r from-white/5 to-white/3 rounded-xl p-3 border border-white/5">
                <div>
                  <div className="text-xs text-white/70">Trusted Sellers</div>
                  <div className="text-sm font-semibold">100k+ approved</div>
                </div>
                <div>
                  <div className="text-xs text-white/70">Delivery Zones</div>
                  <div className="text-sm font-semibold">Worldwide</div>
                </div>
              </motion.div>

              {/* decorative product bubbles */}
              <motion.div className="absolute right-6 top-6 grid gap-3">
                {[1, 2, 3].map((n) => (
                  <motion.div key={n} initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 6 + n }}>
                    <div className="w-16 h-10 bg-white/6 rounded-xl flex items-center justify-center text-sm">{n * 10}k+</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (expanded) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            Why choose <span className="text-white">One Cart?</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
          >
            {whychoose.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-white/3 to-white/5 rounded-2xl p-6 border border-white/5"
                variants={cardAnim}
                whileHover={{ scale: 1.03, boxShadow: "0 30px 60px rgba(2,6,23,0.65)" }}
              >
                <div className="text-4xl text-teal-300 mb-3 flex items-center justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
                <div className="mt-4 text-sm text-white/60">Learn more →</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* MILESTONES / TIMELINE (expanded & detailed) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            Our journey — milestones
          </motion.h2>

          <div className="relative mt-4">
            {/* center line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 transform -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((item, idx) => {
                const left = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    className={`relative lg:flex lg:items-center lg:justify-${left ? "start" : "end"} lg:gap-6`}
                    initial={{ opacity: 0, x: left ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: idx * 0.08 }}
                  >
                    <div className={`lg:w-1/2 ${left ? "lg:pr-6 lg:text-right" : "lg:pl-6 lg:text-left"}`}>
                      <div className="inline-block bg-teal-400 text-black font-bold px-3 py-2 rounded-xl shadow-md">
                        {item.year}
                      </div>
                      <h4 className="text-2xl font-semibold mt-4">{item.title}</h4>
                      <p className="text-white/70 mt-2 max-w-xl">{item.desc}</p>
                      {/* micro details */}
                      <div className="mt-3 flex gap-3 justify-center lg:justify-start">
                        <div className="bg-white/5 px-3 py-1 rounded-full text-sm">Key hires</div>
                        <div className="bg-white/5 px-3 py-1 rounded-full text-sm">Platform v1</div>
                      </div>
                    </div>

                    <div className="lg:w-1/2 hidden lg:block">
                      {/* visual point on center line */}
                      <div className="flex items-center justify-center h-full">
                        <div className="w-6 h-6 bg-teal-300 rounded-full border-4 border-[#02151a] shadow-lg" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GLOBAL PRESENCE VISUAL STRIP */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2 className="text-3xl text-center font-bold text-teal-300 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            Global Reach
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[#021a1d] to-[#052f35] rounded-3xl p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <FaGlobeAmericas className="text-teal-300 text-4xl" />
                <div>
                  <div className="text-white/80 font-semibold">50+ Countries</div>
                  <div className="text-white/60 text-sm">Regional warehouses and local logistic partners</div>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                {["Asia", "Europe", "Americas", "Africa", "Oceania"].map((r, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-lg text-sm">{r}</div>
                ))}
              </div>
            </div>

            {/* decorative world "map" dots */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div key={n} whileHover={{ scale: 1.05 }} className="bg-white/6 rounded-lg p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-300 flex items-center justify-center text-black font-bold">{n * 10}k</div>
                  <div>
                    <div className="text-white/90 font-semibold">Region {n}</div>
                    <div className="text-white/60 text-sm">Top cities covered & fulfillment hub</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PARTNERS / TEAM (expanded with bios and hover) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
            Our Partners & Team
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Leadership</h3>
                <p className="text-white/70">Seasoned leaders steering product, ops & growth.</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={team1} alt="lead" className="w-12 h-12 rounded-full border-2 border-teal-300" />
                    <div>
                      <div className="font-semibold">Amazon</div>
                      <div className="text-sm text-white/70">CEO & Founder</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={team2} alt="lead" className="w-12 h-12 rounded-full border-2 border-teal-300" />
                    <div>
                      <div className="font-semibold">Temu</div>
                      <div className="text-sm text-white/70">CTO</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={team3} alt="lead" className="w-12 h-12 rounded-full border-2 border-teal-300" />
                    <div>
                      <div className="font-semibold">FlipCart</div>
                      <div className="text-sm text-white/70">Managing Operator</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Strategic Partners</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {partners.map((p, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-full border-2 border-white/10 mb-2" />
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-white/70">{p.role}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Team gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white/5 p-6 rounded-2xl border border-white/8 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white/6 flex items-center justify-center text-teal-300 font-bold text-lg">T{i + 1}</div>
                  <div>
                    <div className="font-semibold">Team Member {i + 1}</div>
                    <div className="text-white/70 text-sm">Role — Engineering / Product / Ops</div>
                    <div className="text-xs text-white/60 mt-2">Expertise: Performance, Scalability, Security</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AWARDS & BADGES */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            Awards & Recognitions
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <motion.div key={n} whileHover={{ scale: 1.05 }} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <FaAward className="text-4xl text-teal-300 mx-auto mb-3" />
                <div className="font-semibold">Industry Award {n}</div>
                <div className="text-sm text-white/70 mt-2">Excellence in e-commerce & tech innovation</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* TESTIMONIALS (carousel) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            What customers say
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            <motion.div key={tIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white/5 p-10 rounded-2xl border border-white/10 text-center">
              <FaQuoteLeft className="text-3xl text-teal-300 mx-auto mb-4" />
              <p className="text-white/80 text-lg">{testimonials[tIndex].text}</p>
              <p className="text-teal-300 mt-4 font-semibold">— {testimonials[tIndex].author}</p>
            </motion.div>

            <div className="flex items-center justify-center gap-3 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTIndex(i)} className={`w-3 h-3 rounded-full ${i === tIndex ? "bg-teal-300" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Technology & Innovation (animated bars + chips) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-300 mb-8">Technology & Innovation</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-white/70 mb-4">
                Powered by advanced AI logistics, real-time analytics, and secure cloud infrastructure — One Cart
                continues to set new standards for digital commerce innovation.
              </p>

              <div className="space-y-4">
                {techStack.map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm">
                      <div className="text-white/90 font-semibold">{t.name}</div>
                      <div className="text-white/60">{t.level}%</div>
                    </div>
                    <div className="w-full bg-white/6 h-3 rounded-full mt-2 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.level}%` }} transition={{ duration: 1 + i * 0.2 }} className="h-3 bg-teal-300 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-semibold mb-3">Innovation Labs</h4>
              <p className="text-white/70 mb-4">In-house R&D for ML-based personalization, fraud detection and supply-chain optimization.</p>

              <div className="flex flex-wrap gap-3">
                {["AI Logistics", "Real-time Analytics", "Edge CDN", "Secure Checkout", "Auto-scaling", "A/B Platform"].map((chip, i) => (
                  <div key={i} className="px-3 py-1 rounded-full bg-white/6 text-sm">{chip}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CSR / Accessibility / Sustainability (mini) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-16">
          <motion.div className="bg-gradient-to-br from-[#022b2e] to-[#02343a] rounded-3xl p-8 border border-white/5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-teal-300 font-bold">Sustainability</h4>
                <p className="text-white/70 mt-2">Carbon-neutral shipments in partnered regions; eco-packaging pilot program.</p>
              </div>
              <div>
                <h4 className="text-teal-300 font-bold">Accessibility</h4>
                <p className="text-white/70 mt-2">WCAG friendly UI, screen-reader optimized flows and keyboard nav for critical paths.</p>
              </div>
              <div>
                <h4 className="text-teal-300 font-bold">Community</h4>
                <p className="text-white/70 mt-2">Local-seller uplift programs, training & grants for micro-entrepreneurs.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* LEGACY / CTA (expanded) */}
        <section className="max-w-[1400px] mx-auto px-6 mt-20 mb-32">
          <motion.div className="rounded-3xl p-8 bg-gradient-to-br from-[#022b2e] to-[#02343a] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-teal-300">Our Legacy</h2>
              <p className="text-white/80 mt-4 leading-relaxed">
                Since 2020, One Cart has grown from a small startup into a global e-commerce leader.
                Our focus on quality, speed, and trust has made millions of customers choose us for their everyday needs.
                We continue to invest in people, platform, and process to raise the bar for digital commerce.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                <button className="bg-teal-300 text-black px-6 py-3 rounded-full font-semibold hover:scale-[1.03] transition">Start Selling</button>
                <button className="border border-white/20 px-6 py-3 rounded-full text-white/90 hover:bg-white/5 transition">Contact Sales</button>
                <button className="px-5 py-3 rounded-full bg-white/5 border border-white/7 text-sm">Join Our Team</button>
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="bg-white/6 p-6 rounded-2xl inline-block">
                <div className="text-xs text-white/70">Trusted by</div>
                <div className="flex items-center gap-3 mt-3">
                  <img src={team1} alt="a" className="w-12 h-12 rounded-full" />
                  <img src={team2} alt="b" className="w-12 h-12 rounded-full" />
                  <img src={team3} alt="c" className="w-12 h-12 rounded-full" />
                </div>
                <div className="text-sm text-white/70 mt-3">© {new Date().getFullYear()} One Cart. All rights reserved.</div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default About;
