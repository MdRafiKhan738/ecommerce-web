import React, { useContext, useState, createContext } from 'react'
import axios from 'axios'
import { authdatacontext } from './AuthContext'
import { useEffect } from 'react'

export const admindatacontext = createContext()

const AdminContext = ({ children }) => {
  const [admindata, setadmindata] = useState(null)
  const { serverUrl } = useContext(authdatacontext)

  const getadmin = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/userroutes/getcurrentadmin",
        {},
        { withCredentials: true }
      )
      setadmindata(result.data)
      console.log("✅ Admin data:", result.data)
    } catch (error) {
      setadmindata(null)
      console.error(`❌ error from get admindata ${error}`)
    }
  }
  useEffect(()=>{

    getadmin()
  })

  let value = {
    serverUrl,
    admindata,
    setadmindata,
    getadmin
  }

  return (
    <admindatacontext.Provider value={value}>
      {children}
    </admindatacontext.Provider>
  )
}

export default AdminContext
