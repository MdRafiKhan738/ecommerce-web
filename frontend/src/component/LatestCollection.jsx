import React, { useContext, useEffect, useState } from 'react'
import Tiitle from './Tiitle'
import { shopdatacontext } from '../context/ShopContext'
import Card from './Card'

const LatestCollection = () => {
  let { product } = useContext(shopdatacontext)
  let [latestproduct, setlatestproduct] = useState([])

  useEffect(() => {
    if (product && product.length > 0) {
      setlatestproduct(product.slice(0, 8))
    }
  }, [product])

  return (
    <div className='min-h-screen w-full text-center md:mt-[50px] bg-[#0e0e0e] py-[50px]'>
      <div>
        <Tiitle text1={"Latest"} text2={"Collections"} />
        <p className='w-full m-auto text-[15px] md:text-[20px] px-[10px] text-blue-400'>
          Step Into - New Collection Dropping This Year!
        </p>
      </div>

      <div className='w-full flex items-center justify-center flex-wrap gap-[40px] mt-[50px] px-[20px]'>
        {
          latestproduct.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image1}  // ✅ important: তোমার data তে image1 আছে
              id={item._id}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
