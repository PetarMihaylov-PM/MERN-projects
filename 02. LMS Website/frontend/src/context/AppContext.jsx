import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";

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
  const calculateRating = (course) => {

    if(course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach(course => {
      totalRating += course.rating;
    });

    return totalRating / course.courseRatings.length;
  }
 
  const value = {
    navigate,
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
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