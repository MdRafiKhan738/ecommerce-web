import React from 'react'
import { createContext } from 'react'
export const authdatacontext=createContext()
let serverurl="http://localhost:5000"
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