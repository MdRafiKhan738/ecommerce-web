import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

const Product = () => {
  return (
    <div    className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]'>
      <div className='w-[100%] min-h-[70px] flex items-center justify-center flex-col gap-[10px]'>
        <LatestCollection/>





      </div>
            <div className='w-[100%] min-h-[70px] flex items-center justify-center flex-col gap-[10px]'>
        <BestSeller/>





      </div>






    </div>
  )
}

export default Product