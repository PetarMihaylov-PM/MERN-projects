import { Routes, Route } from 'react-router-dom';
import Home from './pages/student/Home';
import Player from './pages/student/Player';
import CourseDetails from './pages/student/CourseDetails';
import CoursesList from './pages/student/CoursesList';
import MyEnrollments from './pages/student/MyEnrollments';
import Loading from './components/student/Loading.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/course-list' element={<CoursesList />}/>
        <Route path='/my-enrollments' element={<MyEnrollments />}/>
        <Route path='/player/:courseId' element={<Player />}/>
        <Route path='/course/:id' element={<CourseDetails />}/>
        <Route path='/course-list/:input' element={<CoursesList />}/>
        <Route path='/loading/:path' element={<Loading />}/>
      </Routes>
    </div>
  )
}

export default App