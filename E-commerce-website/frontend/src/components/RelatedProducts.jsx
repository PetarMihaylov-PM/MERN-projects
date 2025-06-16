import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const RelatedProducts = ({category, subCategory}) => {

  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {

    if(products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(item => category === item.category);
      productsCopy = productsCopy.filter(item => subCategory === item.subCategory);
      
    }

  },[products])

  return (
    <div>

    </div>
  )
}

export default RelatedProducts