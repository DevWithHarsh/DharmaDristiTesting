import orderModel from '../models/orderModel.js'

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
            payment: paymentMethod !== 'cod' // cod = false, others = true
        });

        await newOrder.save();

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Placing orders using razorpay
const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
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
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true, message: 'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus }