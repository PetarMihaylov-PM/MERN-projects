import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

  const { currency, getCartAmount } = useContext(ShopContext)

  return (
    <div>CartTotal</div>
  )
}

export default CartTotal