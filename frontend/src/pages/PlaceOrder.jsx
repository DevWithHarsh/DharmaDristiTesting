import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                if (cartItems[items] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[items]
                        orderItems.push(itemInfo)
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: method
            }


            switch (method) {
                // API calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t">
            {/* ------------ left side ------------ */}
            <div className="flex flex-col gap-4 w-full sm:max-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
                </div>

                <input required onChange={onChangeHandler} name='email' value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street Address" />

                <div>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                </div>

                <div>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
                </div>

                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />

            </div>
            {/* ------------ Right side -------------- */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className="flex flex-col lg:flex-row gap-4 w-full">
                        {[
                            { key: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
                            { key: 'cod', label: 'Cash on Delivery', logo: null },
                        ].map(({ key, label, logo }) => (
                            <div
                                key={key}
                                onClick={() => setMethod(key)}
                                className={`flex items-center justify-between flex-1 gap-4 border rounded-xl p-4 cursor-pointer transition-all duration-200 min-h-[64px] shadow-sm ${method === key
                                    ? 'border-green-500 bg-green-50 shadow-md'
                                    : 'hover:border-gray-400'
                                    }`}
                            >
                                {/* Radio dot */}
                                <div
                                    className={`w-4 h-4 flex-shrink-0 border-2 rounded-full transition-all ${method === key ? 'bg-green-500 border-green-600' : 'border-gray-300'
                                        }`}
                                ></div>

                                {/* Logo or text */}
                                {logo ? (
                                    <div className="flex-1 flex justify-center items-center">
                                        <img
                                            src={logo}
                                            alt={`${label} logo`}
                                            className="h-6 w-auto max-w-[100px] object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 text-center">
                                        <p className="text-gray-700 text-sm font-semibold">
                                            {label.toUpperCase()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full text-end mt-8">
                        <button type='submit' className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form >
    );
}

export default PlaceOrder;
