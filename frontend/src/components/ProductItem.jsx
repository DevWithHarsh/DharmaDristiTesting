import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

  const { currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null)

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-between h-[320px] w-full transition-transform hover:scale-[1.02] duration-300">
        <div className="h-[140px] w-full flex items-center justify-center bg-gray-100 rounded mb-3 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-contain h-full"
          />
        </div>
        <h3 className="text-sm font-medium text-center text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-600 my-2">₹{price}</p>
          <button className="bg-[#9b4c3c] text-white w-full py-2 rounded-md hover:bg-[#823c2e] mt-auto">
            Buy Now
          </button>
      </div>
    </Link>
  )
}

export default ProductItem
