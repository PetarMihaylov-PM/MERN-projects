import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function LatestCollection() {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  /* for random collection every time

  let firstRandomIndex = Math.floor(Math.random()* (products.length - 11));
  let secondRandomIndex = firstRandomIndex + 10;

  change useEffect to:
  useEffect(()=> {
    setLatestProducts(products.slice(firstRandomIndex, secondRandomIndex));
  }, []);
  
  */

  useEffect(()=> {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text md:text-base text-gray-600'>
          Explore our newest arrivals - stylish, versatile, and made to elevate your everyday look.
        </p>
      </div>
      
    </div>
  )
}

export default LatestCollection
