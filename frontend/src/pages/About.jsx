import React from 'react'

const About = () => {
  return (
    <>
    <div className="text-[#6a4432] px-6 py-12 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#a24e3c] mb-6">About Us</h1>
          <p className="text-lg mb-6 leading-relaxed">
            At{""}
            <span className="font-semibold text-[#a24e3c]">DharmaDristi</span>,
            we believe that every spiritual practice deserves authenticity and
            purity. Rooted deeply in Sanatan traditions, our platform is
            designed to bring you premium pooja essentials with care, devotion,
            and heritage.
          </p>

          <h2 className="text-2xl font-semibold text-[#a24e3c] mb-4">
            Our Vision
          </h2>
          <p className="mb-6 leading-relaxed">
            Our vision is to revive and preserve the sacred rituals of our
            ancestors by making authentic spiritual items accessible to
            everyone. Whether you're performing daily prayers or organizing a
            grand pooja, we aim to be your trusted source.
          </p>

          <h2 className="text-2xl font-semibold text-[#a24e3c] mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li>Handpicked, high-quality pooja items</li>
            <li>Eco-friendly and ethically sourced materials</li>
            <li>Inspired by Vedic principles and Indian traditions</li>
            <li>Fast, safe, and reliable shipping</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#a24e3c] mb-4">
            Meet the Founders
          </h2>
          <p className="mb-6 leading-relaxed">
            DharmaDristi was founded by a group of spiritual seekers and
            artisans who deeply respect the rituals of Indian heritage. Every
            item we offer is a reflection of their commitment and dedication.
          </p>

          <div className="bg-white border border-[#e1c1a1] p-6 rounded-xl shadow-md">
            <p className="italic text-[#a24e3c]">
              "Purity in rituals comes from purity in offerings."
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
