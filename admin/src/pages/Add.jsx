import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [category, setCategory] = useState('Statues');
  const [subCategory, setSubCategory] = useState('');

  const [bestseller, setBestseller] = useState(false);

  // Subcategories mapping
  const subCategories = {
    Statues: [
      'God Statues',
      'Goddess Statues',
      'Brass Idols',
      'Marble Statues',
      'Panchaloha Statues',
    ],
    Yantras: [
      'Shri Yantra',
      'Kuber Yantra',
      'Vastu Yantra',
      'Navgraha Yantra',
      'Hanuman Yantra',
    ],
    Mala: [
      'Rudraksha Mala',
      'Tulsi Mala',
      'Crystal Mala',
      'Sandalwood Mala',
      'Lotus Seed Mala',
    ],
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestseller(false);
        setSubCategory('');
      } else {
        toast.error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Add Product Error:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img
                className="w-20 h-20 object-cover"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                type="file"
                hidden
                id={`image${index + 1}`}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category & Subcategory & Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Category */}
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory('');
            }}
            value={category}
            className="px-3 py-2 border"
          >
            <option value="Statues">Statues</option>
            <option value="Yantras">Yantras</option>
            <option value="Mala">Mala</option>
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="px-3 py-2 border"
          >
            <option value="">Select Subcategory</option>
            {subCategories[category].map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="px-3 py-2 border w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Bestseller checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      {/* Submit button */}
      <button type="submit" className="w-20 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
