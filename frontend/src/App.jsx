import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Registration from './Pages/Registration.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Nav from './component/Nav.jsx'
import Collection from './Pages/Collection.jsx'
import Contact from './Pages/Contact.jsx'
import Product from './Pages/Product.jsx'
import About from './Pages/About.jsx'
import { userdatacontext } from './context/UserContext.jsx'
import Footer from './component/Footer.jsx'
import ProductDetail from './Pages/ProductDetail.jsx'
import Cart from './component/Cart.jsx'
import PlaceOrder from './Pages/PlaceOrder.jsx'
import OrderDetails from './Pages/OrderDetails.jsx'
import OrderDetailsHistory from './Pages/OrderDetailsHistory.jsx'
import AiUltra from "./component/AiUltra.jsx"
import Loader from "./component/Loader.jsx"   // ✅ Global Loader import করা হয়েছে


const App = () => {
  // ✅ context থেকে loading state আনছি
  const { loading } = useContext(userdatacontext)

  return (
    <div className='relative'>
      {/* ✅ Loader শুধুমাত্র তখন দেখাবে যখন loading = true */}
      {loading && <Loader />}

      {/* ✅ Navbar সবসময় দেখাবে */}
      <Nav />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/productdetails/:productid" element={<ProductDetail />} />
        <Route path="/addtocart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
        <Route path="/orderdetailshistory" element={<OrderDetailsHistory />} />
      </Routes>

      {/* ✅ AI Ultra Component */}
      <AiUltra />

      {/* ✅ Footer */}
      <Footer />
    </div>
  )
}

export default App
