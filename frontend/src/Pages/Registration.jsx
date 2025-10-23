import React, { useState, useContext } from 'react'
import logo from "../assets/E-commerce MERN Assets/vcart logo.png"
import { useNavigate } from 'react-router-dom'
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { authdatacontext } from '../context/AuthContext';
import axios from "axios"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { userdatacontext } from '../context/UserContext';
const Registration = () => {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authdatacontext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  let {gotcurrentuser} =useContext(userdatacontext)


  const handlesignup = async (e) => {
    e.preventDefault() // ✅ stop form reload
    console.log("Submitting signup...") // test log
    try {
      const result = await axios.post(`${serverUrl}/auth/register`, {
        name,
        email,
        password
      }, { withCredentials: true })
      console.log("Signup Success:", result.data)
      alert("Account created successfully!") 
      // ✅ visual check
      gotcurrentuser()
      navigate("/login")
    } catch (error) {
      console.log("Signup Error:", error)
      alert("Signup failed! Check console.")
    }
  }
  const googlesignup=async ()=>{


    try{
      const response=await  signInWithPopup(auth,provider)
      let user=response.user
      let name=user.displayName
      let email=user.email
      const result=await axios.post(serverUrl +"/auth/googlelogin",{name,email},{withCredentials:true})
      console.log(result.data)




   




    }
    catch(error){
      throw new Error({message:error.message})


    }
  }




  return (
    <div className='h-[100vh] w-[100vw] flex flex-col items-center text-white bg-gradient-to-l from-[#141414] to-[#0c2025] justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[20px] cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-[60px]' src={logo} alt="onecart" />
        <h1 className='font-bold items-center'>One Cart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] ">
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Place Your Order</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handlesignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlesignup}>
            <img className='h-[30px] ' src="./google.png" alt="google" />Registration with Google
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
            <div className='w-[100%] h-[2px] bg-[#96969635] '></div>Or
            <div className='w-[100%] h-[2px] bg-[#96969635] '></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input
              type="text"
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='UserName'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Joe@gmail.com'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type={show ? "text" : "password"}
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='********'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show && <IoIosEye className='cursor-pointer w-[20px] h-[20px] absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}
            {show && <IoEyeOff className='cursor-pointer w-[20px] h-[20px] absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}

            {/* ✅ Make sure it's submit button */}
            <button
              type="submit"
              className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-bold cursor-pointer hover:bg-[#4848e0] active:scale-95 transition'>
              Create your Account
            </button>

            <p className='flex gap-[10px]'>
              You have an account?
              <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
