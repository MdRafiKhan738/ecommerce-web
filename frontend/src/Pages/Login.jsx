import React, { useContext, useState } from 'react'
import logo from "../assets/E-commerce MERN Assets/vcart logo.png"
import { useNavigate } from 'react-router-dom'
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { userdatacontext } from '../context/UserContext';


const Login = () => {
  let [show, setShow] = useState(false)
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate = useNavigate()

  const serverUrl = "http://localhost:5000" // ✅ এটি যোগ করা হয়েছে
let {gotcurrentuser} =useContext(userdatacontext)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${serverUrl}/auth/login`, { username, email, password })

      if (res.status === 200) {
        alert("✅ Login Successful")
        gotcurrentuser()
        navigate("/")
      } else {
        alert("⚠️ Login Failed, please check your info")
      }

    } catch (error) {
      console.log("Login error:", error)
      alert("❌ Login Failed — Server Error or Wrong Credentials")
    }
  }

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email

      // ✅ Google login API call
      const result = await axios.post(
        `${serverUrl}/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      )

      console.log(result.data)
      alert("✅ Google Login Successful")
      navigate("/")

    } catch (error) {
      console.error("Google login error:", error)
      alert("❌ Google Login Failed")
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col items-center text-white bg-gradient-to-l from-[#141414] to-[#0c2025] justify-start'>
      <div
        className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[20px] cursor-pointer'
        onClick={() => navigate('/')}
      >
        <img className='w-[60px]' src={logo} alt="onecart" />
        <h1 className='font-bold items-center'>One Cart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] ">
        <span className='text-[25px] font-semibold '>Login Page</span>
        <span className='text-[16px]'>Welcome Back to OneCart, Place Your Order</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form
          onSubmit={handleLogin}
          className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'
        >
          <div
            className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'
            onClick={googlelogin}
          >
            <img className='h-[30px]' src="./google.png" alt="google" />
            Login with Google
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
            <div className='w-[100%] h-[2px] bg-[#96969635]' />
            Or
            <div className='w-[100%] h-[2px] bg-[#96969635]' />
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='UserName'
              required
            />

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
                className='cursor-pointer w-[20px] h-[20px] absolute right-[5%]'
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoEyeOff
                className='cursor-pointer w-[20px] h-[20px] absolute right-[5%]'
                onClick={() => setShow(!show)}
              />
            )}

            <button
              type='submit'
              className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-bold cursor-pointer'
            >
              Login
            </button>

            <p className='flex gap-[10px] '>
              You don’t have an account?
              <span
                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                onClick={() => navigate("/registration")}
              >
                Registration
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
