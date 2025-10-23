import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'


export const shopdatacontext = createContext()

const ShopContext = ({ children }) => {
  const [product, setproduct] = useState([])
  const [search, setsearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const[cartitem,setcartitem]=useState({})
  const currency = "$"
  const delivery_fee = 10

  // Fetch all products
  const getproducts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/product/list")
      setproduct(result.data)
    } catch (error) {
      console.log("ShopContext error:", error)
    }
  }
  

  useEffect(() => {
    getproducts()
  }, [])

  return (
    <shopdatacontext.Provider value={{
      product, setproduct, getproducts,
      search, setsearch,
      showSearch, setShowSearch,
      category, setCategory,
      subcategory, setSubcategory,
      currency, delivery_fee
    }}>
      {children}
    </shopdatacontext.Provider>
  )
}

export default ShopContext
