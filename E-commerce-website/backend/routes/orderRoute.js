import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import admingAuth from '../middleware/admingAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',admingAuth,allOrders);
orderRouter.post('/status',admingAuth,updateStatus);

// Payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;