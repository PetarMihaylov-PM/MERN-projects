import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'

function MyCourses() {

  const { currency, allCourses } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async() => {
    setCourses(allCourses);
  }

  useEffect(() => {
    fetchEducatorCourses();
  },[])


  return (
    <div>

    </div>
  )
}

export default MyCourses