import React, { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { FaClipboardList, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const menuItems = [
    { name: 'Add Items', icon: <IoIosAddCircle />, path: '/add' },
    { name: 'List Items', icon: <FaClipboardList />, path: '/lists' },
    { name: 'View Orders', icon: <SiTicktick />, path: '/orders' },
  ]

  return (
    <>
      {/* Mobile Hamburger */}
      <div className='md:hidden fixed top-4 left-4 z-50'>
        <button onClick={() => setOpen(true)} className='text-white text-2xl p-2 bg-gray-800 rounded-md shadow-md'>
          <FaBars />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1c1f26] text-white shadow-2xl transform transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-[18%] md:static`}
      >
        {/* Close Button Mobile */}
        <div className='md:hidden flex justify-end p-4'>
          <button onClick={() => setOpen(false)} className='text-white text-2xl'>
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className='flex flex-col gap-4 pt-16 pl-4 md:pl-6 text-[15px]'>
          {menuItems.map((item, i) => (
            <div
              key={i}
              className='flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b80]'
              onClick={() => { navigate(item.path); setOpen(false) }}
            >
              <p className='flex justify-between items-center w-full text-base md:text-lg'>
                {item.name}
                <div className='flex items-center px-2 text-[25px]'>{item.icon}</div>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideBar
