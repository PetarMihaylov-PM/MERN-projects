import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text md:text-base text-gray-700'>
      <div className=''>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="exchange-icon" />
        <p className='font-semibold'>Easy exchange policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
    </div>
  )
}

export default OurPolicy