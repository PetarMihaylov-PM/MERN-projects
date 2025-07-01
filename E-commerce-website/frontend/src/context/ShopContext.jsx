import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

  const currency = '$';
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {

    if(!size){
      toast.error('Please select product size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]) {

        if (cartData[itemId][size]){
          cartData[itemId][size] += 1;
        }

        else{
          cartData[itemId][size] = 1;
        }
    }

    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  }


  function getCartCount() {
    let totalCount = 0;

    for (const product in cartItems){
      let productSizes = cartItems[product];

      for (const size in productSizes){
        let quantity = productSizes[size];
        if(typeof quantity === 'number' && quantity > 0){
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for(const items in cartItems){
      let itemInfo = products.find(product => product._id === product._id);
      for(const item in cartItems[items]){
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }  
      }
    }
    return totalAmount;
  }


  const getProductData = async() => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setProducts(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductData();
  },[]);


  const value = {
    products, 
    currency, 
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch ,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl
  }

  return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;