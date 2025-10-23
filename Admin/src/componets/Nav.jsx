import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { authdatacontext } from '../Context/AuthContext'
import { admindatacontext } from '../Context/AdminContext'

const Nav = () => {

    let { serverurl } = useContext(authdatacontext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await axios.delete(serverurl + "/auth/logout", { withCredentials: true })
            console.log(response.data)

            // লগআউট সফল হলে /login এ রিডাইরেক্ট
            navigate("/login")

        } catch (error) {
            console.error("Logout error:", error.message)
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-2xl shadow-black'>
            <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[50px]' src="./vcart logo.png" alt="logo" />
                <h1 className='font-bold text-black text-[20px]'>One Cart</h1>
            </div>
            <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-black py-[10px] px-[20px] rounded-2xl text-white' onClick={logout}>Logout</button>
        </div>
    )
}

export default Nav
