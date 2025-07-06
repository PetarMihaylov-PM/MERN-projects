import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from "react-toastify";

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);

  const getAllOrders = async() => {

    if(!token) {
      return null;
    }

    try {
      
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}});
      
      if(response.data.success){
        setOrders(response.data.orders);
      }
      else{
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(response.data.message);
    }

  }

  useEffect(() => {
    getAllOrders();
  },[token]);

  return (
    <div>
      
    </div>
  )
}

export default Orders