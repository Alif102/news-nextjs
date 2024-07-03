"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
const MainCategory = () => {
  const [mainCategoryPosts, setMainCategoryPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the structure data
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');
        const mainCategory = parseInt(structureResponse.data.structure.main_category);

        // Fetch the allpost data
        const allPostsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const allPosts = allPostsResponse.data.data;

        // Filter posts based on the main category
        const filteredPosts = allPosts.flatMap(category => 
          category.posts.filter(post => post.category_id === mainCategory)
        );

        // Set the filtered posts to state
        setMainCategoryPosts(filteredPosts);
      } catch (error) {
        setError('An error occurred while fetching the data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      
      <div>
      <Carousel transition={{ duration: 1 }} className='rounded-xl'>
  {mainCategoryPosts.length > 0 ? (
    mainCategoryPosts.map(post => {
      return (
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
      );
    })
  ) : (
    <p>No posts available for the main category</p>
  )}
  </Carousel>
</div>
    </div>
  );
};

export default MainCategory;
