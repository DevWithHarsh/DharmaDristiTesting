import express from 'express'
import { placeOrder, placeOrderRazorpay, allOrders, updateStatus, userOrders, removeOrder, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { updatePaymentStatus } from '../controllers/orderController.js';

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.post('/update-payment', updatePaymentStatus);

// Payement Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User Features
orderRouter.post('/userorders', authUser, userOrders)
orderRouter.post('/remove', adminAuth, removeOrder);
orderRouter.post('/remove-userOrder',authUser, removeOrder);

// verify Razorpay payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter