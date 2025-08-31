import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import reviewRouter from './routes/reviewRoute.js'
import couponRouter from './routes/couponCodeRoute.js';

const app = express()
const port = process.env.PORT || 4000

// Connect DB + Cloudinary
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // admin frontend ports
  credentials: true
}))

// API Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', dashboardRoutes)
app.use('/api/review', reviewRouter)
app.use('/api/coupon', couponRouter);

app.get('/', (req, res) => {
  res.send("API Working ✅")
})

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
