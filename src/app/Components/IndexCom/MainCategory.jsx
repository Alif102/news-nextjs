"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const cacheDuration = 2 * 60 * 1000; 

const MainCategory = () => {
  const [structureData, setStructureData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const structureCache = JSON.parse(localStorage.getItem('structureData'));
        const postsCache = JSON.parse(localStorage.getItem('allPostsData'));

        const now = new Date().getTime();

        let fetchedStructureData;
        let fetchedAllPostsData;

        if (
          structureCache &&
          postsCache &&
          now - structureCache.timestamp < cacheDuration &&
          now - postsCache.timestamp < cacheDuration
        ) {
          fetchedStructureData = structureCache.data;
          fetchedAllPostsData = postsCache.data;
        } else {
          [fetchedStructureData, fetchedAllPostsData] = await Promise.all([
            fetcher('https://admin.desh365.top/api/structure'),
            fetcher('https://admin.desh365.top/api/all-post')
          ]);

          localStorage.setItem('structureData', JSON.stringify({
            data: fetchedStructureData,
            timestamp: now,
          }));
          localStorage.setItem('allPostsData', JSON.stringify({
            data: fetchedAllPostsData,
            timestamp: now,
          }));
        }

        setStructureData(fetchedStructureData);
        setAllPostsData(fetchedAllPostsData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred while fetching the data</div>;
  }

  const mainCategory = parseInt(structureData.structure.main_category);
  const allPosts = allPostsData.data;

  const mainCategoryPosts = allPosts.flatMap(category => 
    category.posts.filter(post => post.category_id === mainCategory)
  );

  return (
    <div>
      <div>
        <Carousel transition={{ duration: 1 }} className='rounded-xl'>
          {mainCategoryPosts.map(post => (
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
      </div>
    </div>
  );
};

export default MainCategory;
