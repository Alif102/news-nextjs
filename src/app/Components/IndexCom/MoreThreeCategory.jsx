"use client"
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../Shared/Loader';

const fetcher = url => axios.get(url).then(res => res.data);

const MoreThreeCategory = () => {
  const { data: postsData, error: postsError } = useSWR('https://admin.desh365.top/api/all-post', fetcher);
  const { data: structureData, error: structureError } = useSWR('https://admin.desh365.top/api/structure', fetcher);

  if (postsError || structureError) {
    return <div>Error fetching data...</div>;
  }

  if (!postsData || !structureData) {
    return <div>
      <Loader/>
    </div>;
  }

  const moreCategories = structureData.structure.more_three_category.split(',').map(categoryId => parseInt(categoryId.trim(), 10));

  // Filter posts based on more_three_category and get the first post from each category
  const firstPosts = postsData.data.map(category => {
    const firstPost = category.posts.find(post => moreCategories.includes(post.category_id));
    return firstPost;
  }).filter(Boolean); // Remove any undefined (if no matching post found)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {firstPosts.map(post => (
        <Link href={`post/${post?.id}`} key={post?.id}>
          <div className='relative  overflow-hidden shadow-lg'>
            <h2 className=' md:text-xl mb-3 text-sm font-bold'>
              {post?.category_name}
            </h2>
            <div className='relative  w-full h-64'>
              <Image className='rounded-lg'
                src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                alt={post?.title || 'Default Alt Text'}
                layout='fill'
                objectFit='cover'
                priority={true}
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
            <div className='absolute bottom-0 left-0 p-4'>
              <h2 className='text-white md:text-md text-sm font-bold'>
                {post.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoreThreeCategory;
