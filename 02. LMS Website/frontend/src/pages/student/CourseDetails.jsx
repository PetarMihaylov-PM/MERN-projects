import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';

function CourseDetails() {

  const { id } = useParams();
  const { allCourses, calculateRating } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  

  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);
    
    setCourseData(findCourse);
  }

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses]);

  return courseData ? (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

      <div className='absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-fuchsia-200/70 '></div>

      {/* Left side */}
      <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-[28px] text-[36px] font-semibold text-gray-800'>{courseData.courseTitle}</h1> 
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0.200)}}></p> 

      {/* Review and ratings */}
      <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
        <p>{calculateRating(courseData)}</p>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <img className='w-3.5 h-3.5' key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="rating" />
          ))}
        </div>
        <p className='text-fuchsia-600'>
          ({courseData.courseRatings.length} {courseData > 1 ? 'ratings' : 'rating'})
        </p>
        <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
      </div>
      
      <p className='text-sm'>Course by <span className='text-fuchsia-600 underline'>Pete's Academy</span></p>
        
      </div>


      {/* Right side */}
      <div>

      </div>
    </div>
  ) 
  : 
    <Loading/>
}

export default CourseDetails