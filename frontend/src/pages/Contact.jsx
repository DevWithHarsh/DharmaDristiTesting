import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-10 font-sans text-[#6a4432]">
      {/* Outer container aligned like About Us */}
      <div className="max-w-5xl px-10 mx-auto">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#a24e3c] mb-6">Contact Us</h1>

        {/* Image + Info Block */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={assets.contact_img}
              alt="Contact Desk"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-[#a24e3c] mb-4">Our Store</h2>
            <p className="text-base mb-2 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="text-base mb-6">
              Tel: (415) 555-0132 <br />
              Email: <a href="mailto:admin@forever.com" className="underline">admin@forever.com</a>
            </p>

            <h2 className="text-xl font-semibold text-[#a24e3c] mb-2">Careers at Forever</h2>
            <p className="text-base mb-4">Learn more about our teams and job openings.</p>
            <button className="border px-6 py-2 text-sm rounded hover:bg-[#f5e2d0] transition-colors">
              Explore Jobs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
