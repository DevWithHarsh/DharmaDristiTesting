import { syncIndexes } from "mongoose";
import userModel from "../models/userModel.js"

// add product to user cart
const addToCart = async (req, res) => {
    try {

        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] += 1
            } else {
                cartData[itemId] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added to Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Clear the cartData field
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};




export { addToCart, updateCart, getUserCart, clearCart }