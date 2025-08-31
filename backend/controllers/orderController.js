import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
import razorpay from 'razorpay';
import crypto from 'crypto';


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.body.userId;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: paymentMethod !== 'cod'
        });

        await newOrder.save();

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
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Placing orders using razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.body.userId;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

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
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${newOrder._id}`,
            notes: {
                orderId: newOrder._id.toString()
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
        console.log(error);
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
// User Order Data for forntend
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