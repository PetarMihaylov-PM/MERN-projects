import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import AppContext from '../../context/AppContext'


const SearchBar = ({data}) => {

  const { navigate } = useContext(AppContext);
  const [input, setInput] = useState(data ? data : '');

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input)
  }

  return (

    <form onSubmit={handleSearchClick} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
      <img src={assets.search_icon} alt="search-icon" className='md:w-auto w-10 px-3'/>
      <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80'/>
      <button 
        type='submit' 
        className='bg-fuchsia-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 cursor-pointer'>Search</button>
    </form>
  
  )
}

export default SearchBar