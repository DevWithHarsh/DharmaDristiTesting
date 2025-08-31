import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            item['amount'] = order.amount; // <-- Add this line
            item['couponDiscount'] = order.couponDiscount; // <-- Add this line
            item['couponCode'] = order.couponCode; // <-- Add this line
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {

    }
  }

  const handleWriteReview = (productId, orderId) => {
    // Navigate to write review page with product and order info
    navigate(`/write-review?productId=${productId}&orderId=${orderId}`);
  };

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
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
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg font-semibold'>
                      Order Total: {currency}{item.amount}
                      {item.couponDiscount > 0 && (
                        <span className='text-green-600 text-sm ml-2'>
                          (Coupon Discount: -{currency}{item.couponDiscount} {item.couponCode ? `(${item.couponCode})` : ''})
                        </span>
                      )}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>

            {/* Center: Order Status */}
            <div className='flex justify-center items-center flex-[1]'>
              <div className='flex items-center gap-2'>
                <span className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' :
                  item.status === 'Shipped' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></span>
                <span className='text-sm md:text-base'>{item.status}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className='flex justify-end flex-[1] gap-2'>
              <button
                onClick={loadOrderData}
                className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors'
              >
                Track Order
              </button>

              {/* Show Write Review button only for delivered items */}
              {item.status === 'Delivered' && (
                <button
                  onClick={() => handleWriteReview(item._id, item.orderId)}
                  className='bg-black text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-blue-700 transition-colors'
                >
                  Write Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {orderData.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No orders found</p>
          <button
            onClick={() => navigate('/categories')}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;