import React, { createContext } from 'react'
 export const authdatacontext=createContext()
const AuthContext = ({children}) => {
    let serverUrl="https://onecartbackend-jbgj.onrender.com"
    let value={
        serverUrl





    }
  return (
    <div>
        <authdatacontext.Provider value={value}>


            {children}
        </authdatacontext.Provider>





    </div>
  )
}

export default AuthContext
