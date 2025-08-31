import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true }, // <-- Add this line
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestseller: { type: Boolean },
  stock: { type: Number, default: 0 },
  date: { type: Number, required: true },
  // Add these fields to your productSchema
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
});


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel