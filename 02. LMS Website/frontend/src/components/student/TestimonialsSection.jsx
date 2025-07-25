import React, { useContext } from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import AppContext from '../../context/AppContext'

function TestimonialsSection() {


  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font font-medium tet-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>Hear from real learners who’ve transformed their skills and careers through our courses.</p>
      <div className='grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-8 mt-14'>
        {dummyTestimonial.map((testimonial, index) => (
          <div className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden' key={index}>
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                <p className='text-gray-800/80'>{testimonial.role}</p>
              </div>
              
            </div>
            <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <img className='h-5' key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="star" />
                ))}
              </div>
              <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
            </div>
            <a href="#" className='text-fuchsia-600 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection