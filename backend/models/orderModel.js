import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: 'Order Placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
export default orderModel
