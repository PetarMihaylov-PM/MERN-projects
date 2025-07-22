import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-fuchsia-200/70'>
      <h1 className='md:text-[38px] text-[28px] relative font-bold text-gray-800 max-w-3xl mx-auto'>Unlock your full potential with hands-on learning and personalized <span className='text-fuchsia-600'>expert guidance.</span><img src={assets.sketch2} alt="sketch" className='md:block hidden absolute -bottom-7 right-0 w-60'/></h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>Start by enrolling in a course that fits your goals - whether you're a beginner or looking to sharpen advanced skills. Each course is structured into bite-sized lessons, combining video tutorials, interactive quizzes, and practical assignments.</p>

      <p className='md:hidden text-gray-500 max-wsm mx-auto'>Learn at your own pace with step-by-step lessons, hands-on projects, progress tracking, and certification - all in one place.</p>

      <SearchBar />
    </div>
  )
}

export default Hero