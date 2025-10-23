import React, { useContext, useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { authdatacontext } from '../Context/AuthContext';

const Login = () => {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState('')
  let navigate = useNavigate()
  let { serverurl } = useContext(authdatacontext)

  const adminlogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const result = await axios.post(serverurl + "/auth/adminlogin", { email, password }, { withCredentials: true })
      console.log(result.data)

      // ✅ যদি লগইন সফল হয়, তাহলে home এ যাও
      if (result.data && result.data.success) {
        navigate('/')   // 🔥 সফল লগইনের পর হোম পেজে রিডাইরেক্ট
      } else {
        // ❌ ভুল ক্রেডেনশিয়াল হলে error দেখাও
        setError(result.data.message || "Login failed! Please check your credentials.")
      }
    } catch (error) {
      console.log("🔥 Login Error:", error)
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col items-center text-white bg-gradient-to-l from-[#141414] to-[#0c2025] justify-start'>
      <div
        className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[20px] cursor-pointer'
        onClick={() => navigate('/')}
      >
        <img className='w-[60px]' src="./vcart logo.png" alt="onecart" />
        <h1 className='font-bold items-center'>One Cart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] ">
        <span className='text-[25px] font-semibold '>Login Page</span>
        <span className='text-[16px]'>Welcome Back to OneCart, Apply to Admin Login</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form
          onSubmit={adminlogin}
          className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'
        >
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Joe@gmail.com'
              required
            />

            <input
              type={show ? "text" : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='********'
              required
            />

            {!show ? (
              <IoIosEye
                className='cursor-pointer w-[20px] h-[20px] absolute right-[5%] bottom-[200px]'
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoEyeOff
                className='cursor-pointer w-[20px] h-[20px] absolute right-[5%] bottom-[200px]'
                onClick={() => setShow(!show)}
              />
            )}

            {error && (
              <span className='text-red-400 font-semibold text-[14px]'>{error}</span>
            )}

            <button
              type='submit'
              className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-bold cursor-pointer'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
