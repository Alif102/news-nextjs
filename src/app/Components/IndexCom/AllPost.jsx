'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';
import Loader from '../Shared/Loader';

const AllPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem('allPosts');

    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      axios
        .get('https://admin.desh365.top/api/all-post')
        .then(response => {
          setData(response.data.data);
          localStorage.setItem('allPosts', JSON.stringify(response.data.data));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, []);

  const posts = useMemo(() => {
    return data
      ? data.map(post => {
          const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
          return (
            <Link href={`Pages/post/${post?.id}`} key={post?.id}>
              <div
                className='flex gap-2 justify-center items-center hover:underline'
                key={post?.id}>
                <Image
                  src={`https://admin.desh365.top/public/storage/post-image/${post?.image}`}
                  alt={post?.title || 'Default Alt Text'}
                  width={90}
                  height={80} priority={true}
                />
                {/* <img className='w-20' src={imageUrl} alt={post.title} /> */}
                <h2 className='text-[14px]'>{post.title}</h2>
              </div>
              <div className='border borber-b'></div>
            </Link>
          );
        })
      : [];
  }, [data]);

  if (isLoading) return <div>
    <Loader/>
  </div>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div className='h-[410px] py-4 shadow-lg overflow-x-scroll'>
        <div className='flex flex-col space-y-4 gap-3 py-4'>{posts}</div>
      </div>
    </div>
  );
};

export default AllPost;
