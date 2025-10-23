import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoSearchCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa"; // OrderDetails History icon
import { shopdatacontext } from '../context/ShopContext';
import { userdatacontext } from '../context/UserContext';
import { authdatacontext } from '../context/AuthContext';
import axios from 'axios';
import logo from "../assets/E-commerce MERN Assets/vcart logo.png";

const Nav = () => {
  const { userData, gotcurrentuser } = useContext(userdatacontext);
  const { serverUrl } = useContext(authdatacontext);
  const { showSearch, setShowSearch, search, setsearch } = useContext(shopdatacontext);

  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // ✅ Logout handler
  const handlelogout = async () => {
    try {
      await axios.delete(`${serverUrl}/auth/logout`, { withCredentials: true });
      gotcurrentuser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate('/collection');
  };

  // ✅ Fetch cart count
  useEffect(() => {
    if (!userData) return;
    const fetchCartCount = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userData._id}`, {
          withCredentials: true,
        });
        setCartCount(res.data.products?.length || 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartCount();
    const interval = setInterval(fetchCartCount, 4000);
    return () => clearInterval(interval);
  }, [userData]);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-500 ${showMenu ? 'backdrop-blur-lg bg-black/40' : 'backdrop-blur-md bg-white/20'} shadow-lg shadow-black/30`}>
      <div className='max-w-[1200px] mx-auto flex items-center justify-between h-[70px] px-6'>

        {/* 🔹 Logo */}
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className='h-[60px]' />
          <h1 className='text-xl font-bold text-black drop-shadow-md'>One Cart</h1>
        </div>

        {/* 🔹 Desktop Menu */}
        <ul className='hidden md:flex items-center gap-6 flex-1 justify-center'>
          <li onClick={() => handleNavigate('/')} className='text-black px-4 py-2 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Home</li>
          <li onClick={() => handleNavigate('/collection')} className='text-black px-4 py-2 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Collection</li>
          <li onClick={() => handleNavigate('/about')} className='text-black px-4 py-2 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>About</li>
          <li onClick={() => handleNavigate('/contact')} className='text-black px-4 py-2 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Contact</li>
        </ul>

        {/* 🔹 Right Section */}
        <div className='flex items-center justify-end gap-4 relative'>
          {!showSearch ? (
            <IoSearch className='w-[30px] h-[30px] cursor-pointer text-black transition-transform duration-300 hover:scale-110' onClick={handleSearchClick} />
          ) : (
            <IoSearchCircleSharp className='w-[30px] h-[30px] cursor-pointer text-black transition-transform duration-300 hover:scale-110' onClick={() => setShowSearch(false)} />
          )}

          {/* 🔹 OrderDetailsHistory Icon */}
          {userData && (
            <FaClipboardList
              className='w-[28px] h-[28px] text-black cursor-pointer transition-transform duration-300 hover:scale-110'
              onClick={() => navigate('/orderdetailshistory')}
              title="My Orders"
            />
          )}

          {!userData ? (
            <CgProfile className='w-[28px] h-[28px] cursor-pointer transition-transform duration-300 hover:scale-110' onClick={() => setShowProfile(!showProfile)} />
          ) : (
            <div
              className='w-[30px] h-[30px] bg-black/20 text-black rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110'
              onClick={() => setShowProfile(!showProfile)}
            >
              {userData?.name.slice(0, 1)}
            </div>
          )}

          {/* 🔹 Cart Icon with Count */}
          <div className="relative">
            <MdShoppingCart
              className='w-[28px] h-[28px] text-black cursor-pointer transition-transform duration-300 hover:scale-110'
              onClick={() => navigate('/addtocart')}
            />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] font-bold px-[6px] py-[1px] rounded-full
                transition-all duration-500 ease-in-out transform scale-100 shadow-md shadow-red-400/40"
              >
                {cartCount}
              </span>
            )}
          </div>

          {/* 🔹 Mobile Menu Toggle */}
          <div className='md:hidden'>
            {showMenu ? (
              <FiX className='w-[32px] h-[32px] text-black cursor-pointer transition-transform duration-300 hover:rotate-90' onClick={() => setShowMenu(false)} />
            ) : (
              <FiMenu className='w-[32px] h-[32px] text-black cursor-pointer transition-transform duration-300 hover:rotate-90' onClick={() => setShowMenu(true)} />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Search Bar */}
      {showSearch && (
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-[70px] left-0 flex items-center justify-center'>
          <input
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search "
            className='w-[80%] sm:w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]'
          />
        </div>
      )}

      {/* 🔹 Profile Dropdown */}
      {showProfile && (
        <div className='absolute w-[220px] h-[200px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex flex-col justify-around text-[17px] py-[10px] text-white'>
            {!userData && (
              <li
                className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate('/login'); setShowProfile(false) }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { handlelogout(); setShowProfile(false) }}
              >
                Logout
              </li>
            )}
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => navigate('/orderdetailshistory')}>Orders</li>
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>About</li>
          </ul>
        </div>
      )}

      {/* 🔹 Mobile Menu */}
      {showMenu && (
        <>
          <div className='fixed inset-0 bg-black/60 backdrop-blur-xl z-40' onClick={() => setShowMenu(false)}></div>
          <div className='fixed top-[70px] left-0 w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#fff]/80 via-[#eaeaea]/90 to-[#d1d1d1]/80 backdrop-blur-2xl border-t border-black/20 shadow-2xl z-50'>
            <p onClick={() => handleNavigate('/')} className='text-black text-2xl font-semibold my-4 py-2 px-4 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Home</p>
            <p onClick={() => handleNavigate('/collection')} className='text-black text-2xl font-semibold my-4 py-2 px-4 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Collection</p>
            <p onClick={() => handleNavigate('/about')} className='text-black text-2xl font-semibold my-4 py-2 px-4 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>About</p>
            <p onClick={() => handleNavigate('/contact')} className='text-black text-2xl font-semibold my-4 py-2 px-4 rounded-2xl bg-white/40 hover:bg-black/10 cursor-pointer transition-all duration-300'>Contact</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
