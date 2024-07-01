'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const CategoryDisplay = ({ categoryId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `category_${categoryId}_data`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const structureResponse = await axios.get('https://admin.desh365.top/api/structure');
          const categoryID = structureResponse.data.structure[categoryId];

          const postsResponse = await axios.get('https://admin.desh365.top/api/all-post');
          const postsData = postsResponse.data.data.filter(post => post.category_id == categoryID);

          localStorage.setItem(cacheKey, JSON.stringify(postsData));
          setData(postsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      {data.length > 0 && (
        <div className='w-full'>
          <Link href={`Pages/post/${data[0]?.id}`} key={data[0]?.id}>
            <div className=''>
              <div className='relative overflow-hidden' style={{ height: '280px' }}>
                <Image 
                  src={`https://admin.desh365.top/public/storage/post-image/${data[0]?.image}`}
                  alt={data[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-md transition-all duration-300 hover:scale-110'
                  priority={true}
                />
              </div>
              <h2 className='md:text-xl mt-2 text-sm font-bold'>
                {data[0]?.title}
              </h2>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

const ThreeCategory = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 px-5 md:px-2 mt-14'>
      <CategoryDisplay categoryId="three_category_1" />
      <CategoryDisplay categoryId="three_category_2" />
      <CategoryDisplay categoryId="three_category_3" />
    </div>
  );
}

export default ThreeCategory;
