import React, { createContext, useContext, useEffect, useState } from 'react'
import { authdatacontext } from './AuthContext'
import axios from 'axios'

export const userdatacontext = createContext()

const UserContext = ({ children }) => {
  const [userData, setuserData] = useState("")
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authdatacontext)

  // ✅ smart delay function
  const showLoaderWithDelay = (duration = 2000) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, duration)
  }

  // ✅ Current user fetch
  const gotcurrentuser = async () => {
    try {
      setLoading(true)
      const result = await axios.get(serverUrl + "/userroutes/getcurrentuser", { withCredentials: true })
      setuserData(result.data)
      console.log("✅ Current User:", result.data)
      // ⏳ loader কমপক্ষে 2 সেকেন্ড visible থাকবে
      setTimeout(() => setLoading(false), 2000)
    } catch (error) {
      console.log("❌ Error fetching user:", error)
      setuserData(null)
      setTimeout(() => setLoading(false), 2000)
    }
  }

  useEffect(() => {
    gotcurrentuser()
  }, [])

  const value = {
    userData,
    setuserData,
    gotcurrentuser,
    loading,
    setLoading,
    showLoaderWithDelay, // ✅ অন্য component থেকেও call করা যাবে
  }

  return (
    <userdatacontext.Provider value={value}>
      {children}
    </userdatacontext.Provider>
  )
}

export default UserContext
