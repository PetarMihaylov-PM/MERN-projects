import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  
  
  const currency = import.meta.env.VITE_CURRENCY;



  /* Fetch all courses */
  const getAllCourses = async () => {
    setAllCourses(dummyCourses);
  }




  /* Calculate course avarage rating */
  function calculateRating (course) {

    if(course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach(course => {
      totalRating += course.rating;
    });

    return totalRating / course.courseRatings.length;
  }



  /* Function to Calculate Course Chapter Time */

  const calculateChapterTime = (chapter) => {
    let time = 0;

    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);

    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
  }



  /* Function to Calculate Course Duration */
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));

    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
  }



  /* Function to Calculate the Number of Lectures in the course */
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;

    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }



  const value = {
    navigate,
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  }

  useEffect(() => {
    getAllCourses();
  },[]);


  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}


export default AppContext