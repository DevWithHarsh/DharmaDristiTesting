import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import ReviewList from '../components/ReviewList'
import { toast } from "react-toastify"

function Product() {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId])

  return productData ? (
    <div className="border-t pt-6 sm:pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-6 lg:px-12">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Image Section */}
        <div className="flex flex-col lg:flex-row flex-1 gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2 lg:w-[100px] overflow-x-auto lg:overflow-y-auto">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className={`w-20 h-20 object-cover border cursor-pointer rounded ${
                  item === image ? 'border-black' : 'border-gray-300'
                }`}
                alt={`thumb-${index}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={image}
              className="w-full max-h-[400px] sm:max-h-[500px] object-contain rounded"
              alt="main-product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl mt-2">{productData.name}</h1>

          {/* Rating */}
          {productData.averageRating > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg sm:text-xl ${
                      star <= Math.round(productData.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {productData.averageRating} ({productData.totalReviews} review
                {productData.totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          <p className="mt-4 text-2xl sm:text-3xl font-medium">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base lg:w-4/5">{productData.description}</p>

          {/* Add to Cart / Stock */}
          {productData.stock > 1 ? (
            <button
              onClick={() => {
                addToCart(productData._id)
                toast.success("Added to cart!", { position: "bottom-right", autoClose: 2000 })
              }}
              className="bg-black text-white mt-5 px-6 sm:px-8 py-3 text-sm sm:text-base rounded hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
          ) : (
            <p className="text-red-600 mt-5 font-semibold text-lg">Out of Stock</p>
          )}

          {/* Product Policies */}
          <hr className="mt-8 lg:w-4/5" />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 sm:mt-16">
        <ReviewList productId={productData._id} />
      </div>

      {/* Related Products */}
      <div className="mt-10 sm:mt-16">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  )
}

export default Product
