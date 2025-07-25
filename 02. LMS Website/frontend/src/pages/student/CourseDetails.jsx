import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';

function CourseDetails() {

  const { id } = useParams();
  const { allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, currency } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);


  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);

    setCourseData(findCourse);
  }


  const toggleSection = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ));
  }


  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses]);

  return courseData ? (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:py-18 py-20 text-left'>

      <div className='absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-fuchsia-200/70 '></div>

      {/* Left side */}
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-[28px] text-[36px] font-semibold text-gray-800'>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

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


        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>

          <div className='pt-5'>
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="arrow-icon" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.lenght} lectures - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, index) => (
                      <li key={index} className='flex items-center gap-2 py-1 mt-2'>
                        <img src={assets.play_icon} alt="play-icon" className='w-4 h-4' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.isPreviewFree && <p className='text-fuchsia-600 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Course description */}
        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-cl font-semibold text-gray-800'>Course Description</h3>
          <p className='pt-3 rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
        </div>

      </div>


      {/* Right side */}
      <div className='max-w-[424px] shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] z-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>

        {/* Course image and discount days left */}
        <img src={courseData.courseThumbnail} alt="course-image" />
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt="time-icon" />
            <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
          </div>


          {/* Rendering the price section */}
          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
            <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
            <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>


          {/* Rendering the rating, course duration and num of lessons */}
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>

            <div className='flex items-center gap-1'>
              <img src={assets.star} alt="star-icon" />
              <p>{calculateRating(courseData)}</p>
            </div>
            
            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="clock-icon" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.lesson_icon} alt="lessons-icon" />
              <p>{calculateNoOfLectures(courseData)} lessions</p>
            </div>
          </div>

          <button className='md:mt-6 mt-4 w-full py-3 rounded bg-fuchsia-600 text-white font-medium'>{isEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-600'>What's in the course?</p>
            <ul className='ml-4 pt-2 text-sm md:text-base list-disc text-gray-500 space-y-1'>
              <li>High-quality video lessons with step-by-step explanations</li>
              <li>Downloadable resources, templates, and practice files</li>
              <li>Lifetime access to all course materials and future updates</li>
              <li>Certificate of completion to showcase your skills</li>
              <li>Access on all devices — mobile, tablet, and desktop</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
    :
    <Loading />
}

export default CourseDetails