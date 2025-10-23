import React, { createContext } from 'react'
 export const authdatacontext=createContext()
const AuthContext = ({children}) => {
    let serverUrl="http://localhost:5000"
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