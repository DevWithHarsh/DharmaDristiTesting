import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-10 font-sans text-[#6a4432]">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#a24e3c] mb-6">Contact Us</h1>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Image section */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.contact_img} 
            alt="Office desk"
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Text section */}
        <div className="w-full lg:w-1/2 text-[#6a4432]">
          <h2 className="text-2xl font-bold mb-4 text-[#a24e3c]">Our Store</h2>
          <p className="mb-2">54709 Willms Station</p>
          <p className="mb-2">Suite 350, Washington, USA</p>
          <p className="mb-2">Tel: (415) 555-0132</p>
          <p className="mb-6">Email: admin@forever.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
