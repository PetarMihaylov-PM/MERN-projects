import React, { useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {

  const [imageIndex, setImageIndex] = useState(0);

  const heroImages = [
    assets.hero_img2,
    assets.hero_img4,
    assets.hero_img5,
    assets.hero_img6
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  },[])

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* Hero left side */}
      <section className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium test-sm md:text-base'>
              OUR BESTSELLERS
            </p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </section>

      {/* Hero right side */}
      <div className='relative w-full sm:w-1/2 aspect-[4/3] sm:min-h-[400px] overflow-hidden'>
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt='hero-img'
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === imageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero