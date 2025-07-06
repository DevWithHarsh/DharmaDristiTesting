import React from 'react'

const Contact = () => {
  return (
    <div className=" min-h-screen px-6 py-10 font-sans text-[#6a4432]">
        <h1 className="text-3xl font-bold text-[#a24e3c] mb-6">Contact Us</h1>
        <p className="mb-6 text-lg">
          We'd love to hear from you. Whether you have questions about our sacred
          products or need support with your order, feel free to reach out.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e1c1a1] max-w-xl mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-[#e1c1a1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a24e3c]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-[#e1c1a1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a24e3c]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full border border-[#e1c1a1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a24e3c]"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#a24e3c] text-white px-4 py-2 rounded hover:bg-[#c95c2d] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-10 text-center text-sm">
          Or reach out at: <br />
          <span className="font-semibold text-[#a24e3c]">support@dharma-store.com</span> <br />
          <span>Phone: +91-9876543210</span>
        </div>
      </div>
  )
}

export default Contact
