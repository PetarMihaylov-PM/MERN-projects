import { createContext, useEffect, useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  
  
  const currency = import.meta.env.VITE_CURRENCY;
  const { getToken } = useAuth();
  const { user } = useUser();


  /* Fetch all courses */
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/all');
      console.log(data)

      if(data.success) {
        setAllCourses(data.courses);
      } else{
        toast.error(data.message);
      }

    } catch (error) {
        toast.error(data.message);
    }
  }


  // fetch user data

  const fetchUserData = async () => {

    if(user.publicMetadata.role === 'educator'){
      setIsEducator(true);
    }

    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/user/data', {headers: {Authorization: `Bearer ${token}`}});

      if(data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(data.message);
    }
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

    return Math.floor(totalRating / course.courseRatings.length);
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



  /* Fetch User Enrolled Courses */
  const fetchUserEnrolledCourses = async() => {

    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    
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
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    userData,
    setUserData,
    getToken,
    getAllCourses
  }

  useEffect(() => {
    getAllCourses();
    fetchUserEnrolledCourses();
  },[]);


  useEffect(() => {
    if(user){
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  },[user]);


  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}


export default AppContext