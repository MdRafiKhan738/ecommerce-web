import React from 'react';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndoAlt } from 'react-icons/fa';
import { MdPolicy } from "react-icons/md";
const policies = [
  {
    icon: <FaShippingFast className="w-10 h-10 text-white" />,
    title: "Fast Delivery",
    desc: "Get your products delivered quickly and safely to your doorstep."
  },
  {
    icon: <FaShieldAlt className="w-10 h-10 text-white" />,
    title: "Secure Payment",
    desc: "100% secure payment gateway ensuring your transactions are safe."
  },
  {
    icon: <FaHeadset className="w-10 h-10 text-white" />,
    title: "24/7 Support",
    desc: "Our support team is available around the clock to assist you."
  },
  {
    icon: <FaUndoAlt className="w-10 h-10 text-white" />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 30 days for a smooth shopping experience."
  },
];

const OurPolicy = () => {
  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center py-16 px-4">
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
        Our Policies
      </h1>
      <p className="text-white/80 text-center max-w-[800px] mb-12 text-lg md:text-xl">
        We ensure the best shopping experience for our customers with clear, trustworthy, and reliable policies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1200px]">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <div className="bg-gradient-to-r from-[#46d1f7] to-[#1e3c72] p-5 rounded-full mb-4 flex items-center justify-center">
              {policy.icon}
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">{policy.title}</h2>
            <p className="text-white/80 text-base">{policy.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-[1200px] bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Commitment
          </h2>
          <p className="text-white/80 text-lg">
            We are committed to providing high-quality products, reliable delivery, and top-notch customer service. Our policies are designed to make your shopping experience seamless and enjoyable.
          </p>
        </div>
  <div className='flex-1'>
    <MdPolicy  className='h-[40px] w-[150px] '/>




  </div>
      </div>
    </div>
  );
};

export default OurPolicy;
