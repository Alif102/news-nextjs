'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Carousel } from '@material-tailwind/react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const BreakingNewsSlider = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('cachedBreakingNews');
        if (cachedData) {
          setPosts(JSON.parse(cachedData));
          console.log(JSON.parse(cachedData));
        } else {
          const response = await axios.get(
            'https://admin.desh365.top/api/all-post',
          );
          const filteredPosts = response.data.data.filter(
            post => post.category_name === 'ব্রেকিং নিউজ',
          );
          console.log(filteredPosts);

          setPosts(filteredPosts);

          localStorage.setItem(
            'cachedBreakingNews',
            JSON.stringify(filteredPosts),
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const memoizedPosts = useMemo(() => {
    return posts.map(post => (
      <Link href={`Pages/post/${post?.id}`} key={post?.id}>
        <div className='' key={post?.id}>
          <div className='relative w-full '>
            <div
              className='object-cover rounded-md'
              style={{ height: '410px', width: '150px' }}>
              <Image
                src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                alt={post?.title || 'Default Alt Text'}
                layout='fill'
                objectFit='cover'
              />
            </div>

            {/* <img className="w-full h-[410px] object-cover rounded-md" src={`https://admin.desh365.top/public/storage/post-image/${post.image}`} alt={post.title}/> */}
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
            <div className='absolute inset-20 flex items-center mt-0 justify-center'>
              <h2 className='text-white md:text-xl text-sm font-bold'>
                {post.title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    ));
  }, [posts]);

  return (
    <Carousel transition={{ duration: 1 }} className='rounded-xl'>
      {memoizedPosts}
    </Carousel>
  );
};

export default BreakingNewsSlider;
