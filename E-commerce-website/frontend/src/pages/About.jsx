import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about-img" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Forever — your one-stop destination for timeless style and everyday essentials. We believe in combining quality with affordability, offering a carefully curated selection of fashion, accessories, and lifestyle products to suit every taste and occasion.</p>
          <p>At Forever, our mission is to make shopping easy, enjoyable, and inspiring. Whether you're looking for the latest trends or classic favorites, we're here to help you express your individuality through products that are made to last.</p>
        </div>
      </div>
    </div>
  )
}

export default About