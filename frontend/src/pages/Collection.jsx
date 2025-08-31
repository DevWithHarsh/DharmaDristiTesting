import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import SearchBar from '../components/SearchBar';

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // Dynamic Subcategories based on Category
  const subcategoryMap = {
  "Puja Samagri": [
    "Roli (Kumkum / Sindoor)", "Haldi", "Chandan", "Akshat", "Ganga Jal", "Rose water", "Honey", "Cow Ghee",
    "Camphor", "Agarbatti", "Dhoop", "Sambrani Cups", "Cotton Wicks", "Matchbox / Lighter", "Kapoor dani",
    "Turmeric sticks", "Betel leaves & nut", "Cloves & Cardamom", "Dry coconut", "Red/Yellow thread",
    "Ashtagandha", "Janeyu", "Panchpatra & Achamani", "Gomutra", "Sacred ash", "Guggul Resin", "Havan samidha",
    "Havan kund", "Havan spoon & utensils", "Paan leaves", "Cow Dung Cakes"
  ],
  "Diya, Lamps & Lighting": [
    "Mitti Diya", "Brass Diya", "Akhand Diya", "Oil lamps", "LED Electric Diyas", "Diya oils", "Diya accessories"
  ],
  "Mala & Spiritual Jewelry": [
    "Rudraksha mala", "Rudraksha bracelet", "Tulsi mala", "Sphatik mala", "Chandan mala", "Navratna bracelet/ring",
    "Gemstone lockets & rings", "Hanuman gada pendant", "Om / Swastik lockets", "Trishul / Damru pendants"
  ],
  "Meditation & Healing Items": [
    "Meditation cushions", "Singing bowls", "Smudging sticks", "Essential oils", "Aroma diffusers", "Chakra stones",
    "Energy pyramids", "Healing wands", "Pendulums for Reiki"
  ],
  "Yantras & Vastu Items": [
    "Shri Yantra", "Kuber Yantra", "Vastu Dosh Yantras", "Bagua mirrors", "Brass tortoise", "Pyramid Yantra",
    "Gomti Chakra", "Cowrie Shells", "Feng Shui items", "Vastu compass", "Surya Yantra", "Hanuman Yantra",
    "Durga Beesa Yantra", "Vastu Danda", "Sea Salt"
  ],
  "Idols, Photos & Murti": [
    "Marble idols", "Brass idols", "Panchdhatu idols", "Polyresin idols", "Miniature idols", "Keychain idols",
    "Photo frames", "Wall posters", "Digital LED frames"
  ],
  "Religious Literature & Books": [
    "Bhagavad Gita", "Ramayana", "Hanuman Chalisa", "Sai Satcharitra", "Puranas", "Vedas", "Lal Kitab",
    "Panchang", "Mantra books", "Bhajan books", "Aarti Sangrah"
  ],
  "Natural & Ayurvedic Items": [
    "Herbal dhoop", "Gaumutra Ark", "Panchagavya Products", "Herbal bath powders", "Neem / Tulsi Soap",
    "Ayurvedic oils", "Vibhuti", "Ubtan"
  ],
  "Temple Accessories": [
    "Mandirs", "Ghanti", "Puja chowki", "Wooden stools", "Copper lota", "Bell chains", "Hanging diyas",
    "Puja shelves"
  ],
  "Gift Items": [
    "Festival hampers", "Return gift packs", "Corporate gifts", "Customized spiritual boxes", "Prasad boxes"
  ],
  "Festival Specific Items": [
    "Holi Items", "Diwali Items", "Navratri Items", "Raksha Bandhan Items", "Karva Chauth Items", "Janmashtami Items"
  ],
  "Eco-friendly Spiritual Products": [
    "Cow dung diyas", "Clay Ganesha", "Herbal havan cups", "Biodegradable packaging", "Palm leaf scriptures"
  ],
  "Astrology Services & Products": [
    "Personalized horoscope", "Gemstone recommendation", "Pooja recommendations", "Pooja kits", "Pandit booking",
    "Astro consultation", "Grah shanti kits"
  ]
};


  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    const sorted = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        setFilterProducts(sorted.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(sorted.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTERS */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown" />
        </p>

        {/* CATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(subcategoryMap).map((cat, i) => (
              <label key={i} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {category.length === 0
              ? Object.values(subcategoryMap).flat().map((sub, i) => (
                  <label key={i} className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={sub} onChange={toggleSubCategory} />
                    {sub}
                  </label>
                ))
              : category
                  .map(cat => subcategoryMap[cat] || [])
                  .flat()
                  .map((sub, i) => (
                    <label key={i} className='flex gap-2'>
                      <input className='w-3' type="checkbox" value={sub} onChange={toggleSubCategory} />
                      {sub}
                    </label>
                  ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - PRODUCT LISTING */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <p className='font-bold'>ALL COLLECTIONS</p>
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={Array.isArray(item.image) ? item.image[0] : item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection;
