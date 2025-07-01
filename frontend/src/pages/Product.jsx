import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

function Product() {
  const { productId } = useParams()
  const { products, currency,addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Image Section */}
        <div className='flex flex-1 flex-col sm:flex-row gap-4'>

          {/* Thumbnails */}
          <div className='flex sm:flex-col gap-2 sm:w-[120px] overflow-x-auto sm:overflow-y-auto'>
            {
              productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className={`w-20 h-20 object-cover border cursor-pointer rounded ${item === image ? 'border-black' : 'border-gray-300'
                    }`}
                  alt={`thumb-${index}`}
                />
              ))
            }
          </div>

          {/* Main Image */}
          <div className='flex-1'>
            <img
              src={image}
              className='w-full max-h-[500px] object-contain rounded'
              alt='main-product'
            />
          </div>

        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="star-dull" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <button onClick={()=>addToCart(productData._id)} className='bg-black text-white mt-5 px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 felx flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy whithin 7 days.</p>
          </div>
        </div>
      </div>
      {/* ------- Description & Review Section --------------*/}
      <div className='mt-20'>
          <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque est a quod suscipit. Deserunt, a!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos reprehenderit ipsam laboriosam, id perspiciatis harum?</p>
          </div>
      </div>

      {/* --------- display related products --------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
