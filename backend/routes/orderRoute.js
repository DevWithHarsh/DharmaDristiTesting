import express from 'express'
import {placeOrder,placeOrderRazorpay,allOrders,updateStatus, userOrders,removeOrder} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payement Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User Features
orderRouter.post('/userorders',authUser,userOrders)


orderRouter.post('/remove', adminAuth, removeOrder);
export default orderRouter