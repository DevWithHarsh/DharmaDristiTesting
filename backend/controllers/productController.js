import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";

// function for add product 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller } = req.body;

        // Correct way to access files using optional chaining
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: 'Product Added' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// function for list product
const listProduct = async (req, res) => {

    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

// function for remove product
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

// function for single product info
const singleProduct = async (req, res) => {

    try {
        const { productID } = req.body
        const product = await productModel.findById(productID)
        res.json({ success: true, product })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

// ✅ Add stock controller
const addStock = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const product = await productModel.findById(id);
        if (!product) return res.json({ success: false, message: "Product not found" });

        product.stock = (product.stock || 0) + Number(quantity);
        await product.save();

        res.json({ success: true, message: "Stock added successfully", stock: product.stock });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// ✅ Remove stock controller
const removeStock = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const product = await productModel.findById(id);
        if (!product) return res.json({ success: false, message: "Product not found" });

        product.stock = Math.max((product.stock || 0) - Number(quantity), 0);
        await product.save();

        res.json({ success: true, message: "Stock removed successfully", stock: product.stock });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};


export { listProduct, addProduct, removeProduct, singleProduct, addStock, removeStock };
