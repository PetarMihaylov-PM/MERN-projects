import orderModel from '../models/orderModule.js'

// Placing orders using COD
const placeOrder = async(req, res) => {

  try {
    
    const {userId, items, amount, address} = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    
    await userModel.findByIdAndUpdate(userId,{cartData:{}});

    res.json({success: true, message: 'Order Placed'});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }

}


// Placing orders using Stripe
const placeOrderStripe = async(req, res) => {
  
  try {
    
    

  } catch (error) {
    
  }

}


// Placing orders using Razorpay
const placeOrderRazorpay = async(req, res) => {
  
  try {
    
    

  } catch (error) {
    
  }

}


// Display all orders for admin panel
const allOrders = async(req, res) => {
  
  try {
    
    

  } catch (error) {
    
  }

}


// User order data for frontend
const userOrders = async(req, res) => {
  
  try {
    
    

  } catch (error) {
    
  }

}


// Update order status from admin panel
const updateStatus = async(req, res) => {
  
  try {
    
    

  } catch (error) {
    
  }

}


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};