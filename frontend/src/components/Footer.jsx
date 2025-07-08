import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                DharmaDristi was founded by devotees, entrepreneurs, and artisans who deeply believe that purity in worship begins with purity in offerings. Their goal is to restore the sanctity of pooja rituals by delivering products that are not just items, but sacred companions in your spiritual journey.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Info@dharmadristi.com</li>
            </ul>
        </div>
      </div>
      <div>
            <hr />
            <p className='py-5 text-sm text-center'>
                Copyright 2025@ dharmadridti.com - ALL Right Resereved.
            </p>
        </div>
    </div>
  )
}

export default Footer
