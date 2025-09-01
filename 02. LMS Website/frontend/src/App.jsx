import { Routes, Route, useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import Player from './pages/student/Player';
import CourseDetails from './pages/student/CourseDetails';
import CoursesList from './pages/student/CoursesList';
import MyEnrollments from './pages/student/MyEnrollments';
import Loading from './components/student/Loading.jsx';
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import MyCourses from './pages/educator/MyCourses.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx'
import Navbar from './components/student/Navbar.jsx';
import 'react-quill/dist/quill.snow.css';
import {ToastContainer} from 'react-toastify';

function App() {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {
        !isEducatorRoute ? <Navbar /> 
        : 
        null
        
        }
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/course-list' element={<CoursesList />}/>
        <Route path='/my-enrollments' element={<MyEnrollments />}/>
        <Route path='/player/:courseId' element={<Player />}/>
        <Route path='/course/:id' element={<CourseDetails />}/>
        <Route path='/course-list/:input' element={<CoursesList />}/>
        <Route path='/loading/:path' element={<Loading />}/>
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />}/>
          <Route path='add-course' element={<AddCourse />}/>
          <Route path='my-courses' element={<MyCourses />}/>
          <Route path='student-enrolled' element={<StudentsEnrolled />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App