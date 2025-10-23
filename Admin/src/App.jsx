import React from 'react'
import Home from './page/Home'
import Add from './page/Add'
import List from './page/List'
import Login from './page/Login'

import { Route, Routes, useLocation } from 'react-router-dom'
import AdminOrder from './page/AdminOrder'



const App = () => {

  return (
    <div>
      <Routes>
        <Route   path="/" element={<Home/>}/>
       <Route   path="/add" element={<Add/>}/>
       <Route   path="/lists" element={<List/>}/>
       <Route   path="/login" element={<Login/>}/>
           <Route   path="/orders" element={<AdminOrder/>}/>
              



      </Routes>



    </div>
  )
}

export default App