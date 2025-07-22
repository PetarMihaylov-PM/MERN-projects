import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  
  
  const currency = import.meta.env.VITE_CURRENCY;

  /* Fetch all courses */
  const getAllCourses = async () => {
    setAllCourses(dummyCourses);
  }
 
  const value = {
    navigate,
    currency,
    allCourses,
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