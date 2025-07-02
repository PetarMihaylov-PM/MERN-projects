import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

function Login() {

  const [currentState, setCurrentState] = useState('Sign Up');
  
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassowrd] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    try {
      
      

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-non h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Sign Up' ? 
        <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' value={name} required/>
      : 
        null}
      <input onChange={(e) => setPassowrd(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' value={email} required/>
      <input onChange={(e) => setPassowrd(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' value={password} required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' 
          ? 
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          :
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login