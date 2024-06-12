"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import newslogo from '../../assets/newslogo.png'
const Naavbar = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    fetch('https://admin.desh365.top/api/all-category')
      .then(response => response.json())
      .then(data => {
        const extractedCategories = data.data.map(category => ({
          id: category.id,
          name: category.name
        }));
        setCategories(extractedCategories);
        if (extractedCategories.length > 0) {
          setActiveRoute(extractedCategories[0].name);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [isNavbarHidden, setIsNavbarHidden] = useState(true);

  const toggleNav = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1050) {
        setIsNavbarHidden(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  return (
    <div>
      <div className="bg-gray-200 mx-auto">
        <nav className="bg-gray-100 flex text-gray-800 items-center justify-between flex-wrap pb-2 px-5">
          <div>
            <Link href='/'>
            <div className='rounded-md py-1' style={{ height: '80px', width: '80%' }}>
    <Image 
      src={newslogo}
      alt='logo' 
      
    />
  </div>
              {/* <img className='h-[80px] w-[70%] py-1 rounded-md' src='https://news-portal-gray.vercel.app/assets/news_logo-BtjqPS6t.png' alt="logo" /> */}
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleNav}
              className="flex flex-col px-3 py-2 border rounded border-gray-800 hover:text-white hover:border-white"
            >
              <div className="w-6 h-1 bg-black"></div>
              <div className="w-6 h-1 bg-black my-1"></div>
              <div className="w-6 h-1 bg-black"></div>
            </button>
          </div>
          <div
            className={`w-full lg:w-auto block lg:items-center lg:inline-block ${
              isNavbarHidden ? 'hidden' : ''
            }`}
            id="navbar"
          >
            <div className="lg:flex-grow justify-center text-[18px] text-center space-x-3">
              <ul className="flex md:flex-row flex-col md:items-center md:gap-5 gap-3">
                {categories.slice(0, 5).map(category => (
                  <li key={category.id}>
                    <Link href={category.name} className={`hover:text-purple-500 ${activeRoute === category.name ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(category.name)}>
                      {category.name}
                    </Link>
                  </li>
                ))}
                {categories.length > 5 && (
                  <li
                    className="relative"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                  >
                    <span className="hover:text-purple-500 cursor-pointer">আরও</span>
                    {dropdownVisible && (
                      <ul className="absolute right-0 mt-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ease-in-out opacity-100 transform scale-100">
                        {categories.slice(5).map(category => (
                          <li key={category.id} className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                            <Link href={category.name} className={activeRoute === category.name ? 'text-purple-500 font-bold' : ''} onClick={() => handleSetActiveRoute(category.name)}>
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Naavbar;




//  <ul className="flex md:flex-row flex-col md:items-center md:gap-5 gap-3">
// {categories.slice(0, 5).map(category => (
//   <li key={category.id}>
//     <Link href={category.name} className="hover:text-purple-500">
//       {category.name}
//     </Link>
//   </li>
// ))}
// {categories.length > 5 && (
//   <li
//     className="relative"
//     onMouseEnter={() => setDropdownVisible(true)}
//     onMouseLeave={() => setDropdownVisible(false)}
//   >
//     <span className="hover:text-purple-500 cursor-pointer">আরও</span>
//     {dropdownVisible && (
//       <ul className="absolute right-0 mt-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-100 ease-in-out opacity-100 transform scale-200">
//         {categories.slice(5).map(category => (
//           <li key={category.id} className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
//             <Link href={category.name}>{category.name}</Link>
//           </li>
//         ))}
//       </ul>
//     )}
//   </li>
// )}
// </ul>
