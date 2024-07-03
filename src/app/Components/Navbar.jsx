"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import newslogo from '../../assets/newslogo.png';

const Navbar = () => {


  // logo 
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin.desh365.top/api/structure');
        const result = await response.json();
        if (result.status) {
          setLogo(result.structure.logo);
          console.log(result.structure.logo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(logo)




  const [posts, setPosts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);

  useEffect(() => {
    fetch('https://admin.desh365.top/api/all-post')
      .then(response => response.json())
      .then(data => {
        const uniquePosts = removeDuplicates(data.data.posts, 'category_id');
        setPosts(uniquePosts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const removeDuplicates = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  };

  const toggleNav = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  return (
    <div>
      <div className="bg-gray-200 mx-auto">
        <nav className="bg-gray-100 flex text-gray-800 items-center justify-between flex-wrap pb-2 px-5">
          <div>
            {/* <Link href='/'>
              <div className='rounded-md py-1' style={{ height: '80px', width: '80%' }}>
                <Image 
                  src={newslogo}
                  alt='logo' 
                  priority={true}
                />
              </div>
            </Link> */}

{logo ? (
        <div>
          {/* <Link href='/'>
              <div className='rounded-md py-1' style={{ height: '80px', width: '80%' }}>
                <Image 
                src={`https://admin.desh365.top/public/storage/logo/${logo}`}
                  alt='logo' 
                  priority={true}
                />
              </div>
            </Link> */}
        
        <Link href='/'>  <img className='h-20 w-36 rounded-md ' src={`https://admin.desh365.top/public/storage/logo/${logo}`} alt="Logo" /> </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
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
                {posts.slice(0, 5).map(post => (
                  <li key={post.id}>
                    <Link href={`/category/${post.category_id}`} className={`hover:text-purple-500 ${activeRoute === post.category_id.toString() ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(post.category_id.toString())}>
                      {post.category_id}
                    </Link>
                  </li>
                ))}
                {posts.length > 5 && (
                  <li
                    className="relative"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                  >
                    <span className="hover:text-purple-500 cursor-pointer">আরও</span>
                    {dropdownVisible && (
                      <ul className="absolute right-0 mt-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ease-in-out opacity-100 transform scale-100">
                        {posts.slice(5).map(post => (
                          <li key={post.id} className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                            <Link href={`/category/${post.category_id}`} className={activeRoute === post.category_id.toString() ? 'text-purple-500 font-bold' : ''} onClick={() => handleSetActiveRoute(post.category_id.toString())}>
                              {post.category_id}
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

export default Navbar;
