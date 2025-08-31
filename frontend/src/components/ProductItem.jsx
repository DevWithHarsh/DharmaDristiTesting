import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductItem = ({ id, image, name, price }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useContext(ShopContext);
  const isWishlisted = wishlistItems.includes(id);

  const handleBuyNow = async () => {
    try {
      await addToCart(id);  // use prop 'id'
      toast.success("Added to cart");
      navigate('/cart');    // navigate to cart page
    } catch (err) {
      toast.error("Failed to add to cart");
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-between h-[320px] w-full transition-transform hover:scale-[1.02] duration-300">
      <Link className='text-gray-700 cursor-pointer w-full' to={`/product/${id}`}>
        <div className="h-[140px] w-full flex items-center justify-center bg-gray-100 rounded mb-3 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-contain h-full"
          />
        </div>
        <h3 className="text-sm font-medium text-center text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-600 my-2 text-center">₹{price}</p>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation(); // stop the click from going to parent <Link>
          e.preventDefault();  // prevent default <a> link behavior
          handleBuyNow();      // call your function
        }}
        className="bg-[#9b4c3c] text-white w-full py-2 rounded-md hover:bg-[#823c2e] mt-auto"
      >
        Buy Now
      </button>
      <button onClick={() =>
        isWishlisted ? removeFromWishlist(id) : addToWishlist(id)
      }>
        {isWishlisted ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default ProductItem;