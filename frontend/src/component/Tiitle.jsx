import React from 'react'

const Tiitle = ({text1,text2}) => {
  return (
    <div   className='inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px] '>

    <p  className='text-blue-500'>

        {text1} <span className='text-teal-500'>{text2}</span>

    </p>





    </div>
  )
}

export default Tiitle