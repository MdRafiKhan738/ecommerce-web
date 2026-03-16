import React from 'react'
import { createContext } from 'react'
export const authdatacontext=createContext()
let serverurl="https://onecartbackend-jbgj.onrender.com"
let value={

    serverurl
}
const AuthContext = ({children}) => {
  return (
    <div>
        <authdatacontext.Provider value={value}>
            {children}



        </authdatacontext.Provider>



    </div>
  )
}

export default AuthContext
