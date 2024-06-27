'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Carousel } from '@material-tailwind/react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const MainCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategory, setMainCategory] = useState(null);

  useEffect(() => {
    const cachedMainCategory = localStorage.getItem('mainCategory');
    const cachedData = localStorage.getItem('postsData');

    if (cachedMainCategory && cachedData) {
      setMainCategory(JSON.parse(cachedMainCategory));
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      // Fetch the structure data first
      axios.get('https://admin.desh365.top/api/structure')
        .then((response) => {
          console.log('Fetched Structure Data:', response.data);
          const fetchedMainCategory = response.data.structure.main_category;
          setMainCategory(fetchedMainCategory);
          localStorage.setItem('mainCategory', JSON.stringify(fetchedMainCategory));
        })
        .catch((error) => {
          console.error("Error fetching structure data:", error);
        });

      // Fetch the posts data
      axios.get('https://admin.desh365.top/api/all-post')
        .then((response) => {
          console.log('Fetched Data:', response.data);
          const fetchedData = response.data.data;
          setData(fetchedData);
          localStorage.setItem('postsData', JSON.stringify(fetchedData));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(post => post.category_id == mainCategory);
  }, [data, mainCategory]);

  if (loading) {
    return <div>
      <Loader/>
    </div>;
  }

  console.log(data);

  return (
    <Carousel transition={{ duration: 1 }} className='rounded-xl'>
      {filteredData.map(post => (
        <Link href={`Pages/post/${post?.id}`} key={post?.id}>
          <div className='' key={post?.id}>
            <div className='relative' style={{ height: '410px', width: '100%' }}>
              <div className='object-cover rounded-md h-full w-full relative'>
                <Image
                  src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                  alt={post?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
              <div className='absolute inset-20 flex items-center mt-0 justify-center'>
                <h2 className='text-white md:text-xl text-sm font-bold'>
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default MainCategory;
