import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

function Orders() {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center gap-4'
          >
            {/* Left: Product Info */}
            <div className='flex items-start gap-6 flex-[1]'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt='' />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: 1</p>
                </div>
                <p className='mt-2'>
                  Date: <span className='text-gray-400'>25,Jun,2025</span>
                </p>
              </div>
            </div>

            {/* Center: Ready to Ship */}
            <div className='flex justify-center items-center flex-[1]'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <span className='text-sm md:text-base'>Ready to Ship</span>
              </div>
            </div>

            {/* Right: Track Order */}
            <div className='flex justify-end flex-[1]'>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;