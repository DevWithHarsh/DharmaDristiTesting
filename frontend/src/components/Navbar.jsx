import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();
  const { wishlistItems } = useContext(ShopContext);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setShowProfileMenu(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-32 sm:w-36" alt="logo" />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="hover:text-[#c95c2d]">Home</NavLink>
        <NavLink to="/categories" className="hover:text-[#c95c2d]">Categories</NavLink>
        <NavLink to="/shop" className="hover:text-[#c95c2d]">Shop</NavLink>
        <NavLink to="/about" className="hover:text-[#c95c2d]">About</NavLink>
        <NavLink to="/contact" className="hover:text-[#c95c2d]">Contact</NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-4 cursor-pointer"
          alt="search"
        />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <img
            onClick={() => {
              if (token) setShowProfileMenu((prev) => !prev);
              else navigate('/login');
            }}
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />

          {token && showProfileMenu && (
            <div className="absolute right-0 pt-4 z-20">
              <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-600 rounded shadow-md">
                <p
                  onClick={() => {
                    navigate('/orders');
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-[#c95c2d]"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    navigate('/write-review');
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-[#c95c2d]"
                >
                  Write Review
                </p>
                <p
                  onClick={() => {
                    navigate('/my-reviews');
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-[#c95c2d]"
                >
                  My Reviews
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-[#c95c2d]"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist" className="relative">
          <img src={assets.heart_icon} className="w-5" alt="wishlist" />
          {wishlistItems?.length > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-pink-500 text-white rounded-full text-[8px]">
              {wishlistItems.length}
            </p>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-[#ffff] transition-all duration-300 
    ${visible ? 'w-3/4' : 'w-0'} sm:hidden z-30 overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink 
            onClick={() => setVisible(false)} 
            to="/"
            className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
          >Home</NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            to="/categories"
            className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
          >Categories</NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            to="/shop"
            className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
          >Shop</NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            to="/about"
            className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
          >About</NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            to="/contact"
            className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
          >Contact</NavLink>

          {/* Profile options in mobile menu */}
          {token && (
            <>
              <NavLink 
                onClick={() => setVisible(false)} 
                to="/orders"
                className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
              >Orders</NavLink>
              <NavLink 
                onClick={() => setVisible(false)} 
                to="/write-review"
                className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
              >Write Review</NavLink>
              <NavLink 
                onClick={() => setVisible(false)} 
                to="/my-reviews"
                className={({ isActive }) => `py-2 pl-6 border cursor-pointer ${isActive ? 'bg-[#c95c2d] text-white' : ''}`}
              >My Reviews</NavLink>
              <p onClick={logout} className="py-2 pl-6 border cursor-pointer hover:text-[#c95c2d]">Logout</p>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;
