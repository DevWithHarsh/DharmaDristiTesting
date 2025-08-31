import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
import { incrementCouponUsage } from './couponController.js';
import razorpay from 'razorpay';
import crypto from 'crypto';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod, couponCode, couponDiscount, originalAmount, couponType } = req.body;
        const userId = req.body.userId;

        // Debug: Log entire request body
        console.log('Full request body:', JSON.stringify(req.body, null, 2));
        console.log('Received couponType specifically:', couponType);
        console.log('Type of couponType:', typeof couponType);

        // Validate couponType if provided
        let validCouponType = null;
        if (couponType) {
            if (['percentage', 'fixed'].includes(couponType)) {
                validCouponType = couponType;
                console.log('Valid couponType set to:', validCouponType);
            } else {
                console.log('Invalid couponType received:', couponType);
                // Set to null if invalid value is received
                validCouponType = null;
            }
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            originalAmount: originalAmount || amount,
            address,
            paymentMethod,
            payment: paymentMethod !== 'cod',
            couponCode: couponCode || null,
            couponDiscount: couponDiscount || 0,
            couponType: validCouponType // Use validated coupon type
        });

        await newOrder.save();

        // Increment coupon usage count if coupon was used
        if (couponCode) {
            await incrementCouponUsage(couponCode);
        }

        // Reduce stock for each item
        for (const item of items) {
            const product = await productModel.findById(item._id);
            if (product) {
                product.stock -= item.quantity;
                if (product.stock < 0) product.stock = 0;
                await product.save();
            }
        }

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log('Order placement error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Placing orders using razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod, couponCode, couponDiscount, originalAmount, couponType } = req.body;
        const userId = req.body.userId;

        // Debug: Log entire request body
        console.log('Full Razorpay request body:', JSON.stringify(req.body, null, 2));
        console.log('Received couponType for Razorpay specifically:', couponType);
        console.log('Type of couponType for Razorpay:', typeof couponType);

        // Validate couponType if provided
        let validCouponType = null;
        if (couponType) {
            if (['percentage', 'fixed'].includes(couponType)) {
                validCouponType = couponType;
                console.log('Valid Razorpay couponType set to:', validCouponType);
            } else {
                console.log('Invalid Razorpay couponType received:', couponType);
                // Set to null if invalid value is received
                validCouponType = null;
            }
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            originalAmount: originalAmount || amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
            couponCode: couponCode || null,
            couponDiscount: couponDiscount || 0,
            couponType: validCouponType // Use validated coupon type
        });

        await newOrder.save();

        // Increment coupon usage count if coupon was used
        if (couponCode) {
            await incrementCouponUsage(couponCode);
        }

        // Reduce stock for each item
        for (const item of items) {
            const product = await productModel.findById(item._id);
            if (product) {
                product.stock -= item.quantity;
                if (product.stock < 0) product.stock = 0;
                await product.save();
            }
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Amount in paise (after discount)
            currency: "INR",
            receipt: `receipt_${newOrder._id}`,
            notes: {
                orderId: newOrder._id.toString(),
                couponCode: couponCode || 'none',
                originalAmount: originalAmount || amount
            }
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            message: "Order Placed",
            order: razorpayOrder,
            orderId: newOrder._id
        });

    } catch (error) {
        console.log('Razorpay order error:', error);
        res.json({ success: false, message: error.message });
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
            return res.status(400).json({ success: false, message: "Missing payment data" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed. Order not placed." });
        }

        // ✅ If verification passes, update order status
        await orderModel.findByIdAndUpdate(orderId, {
            status: 'placed',
            razorpay_order_id,
            razorpay_payment_id
        });

        res.json({ success: true, message: "Payment verified and order placed" });

    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ success: false, message: "Server error while verifying payment" });
    }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User Order Data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { payment });
        res.json({ success: true, message: "Payment status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeOrder = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.json({ success: false, message: "Order ID is required" });
        }

        await orderModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Order deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to delete order", error });
    }
};

export { updatePaymentStatus, verifyRazorpay, placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, removeOrder }