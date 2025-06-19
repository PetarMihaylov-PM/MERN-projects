import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

  const currency = '$';
  const deliveryFee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

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

  useEffect(() => {
    console.log(cartItems);
  },[cartItems])

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
    getCartAmount
  }

  return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;