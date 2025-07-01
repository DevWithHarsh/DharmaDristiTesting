import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

function PlaceOrder() {

    const [method, setMethod] = useState('cod')

    const { navigate } = useContext(ShopContext)

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t">
            {/* ------------ left side ------------ */}
            <div className="flex flex-col gap-4 w-full sm:max-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className="flex gap-3">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street Address" />

                <div>
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                </div>

                <div>
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />

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
                            { key: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
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
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
