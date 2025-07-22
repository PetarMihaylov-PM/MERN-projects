import React from 'react'
import { assets } from '../../assets/assets'

const CourseCard = ({course}) => {
  return (
    <div>
      <img src={course.courseThumbnail} alt='thumbnail' />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star} alt="rating" />
            ))};
          </div>
          <p>
            22
          </p>
        </div>
        <p>{course.coursePrice - course.discount}</p>
      </div>
    </div>
  )
}

export default CourseCard