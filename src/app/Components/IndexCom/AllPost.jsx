'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AllPost = () => {
  // State to store posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check if cached data exists
        const cachedData = localStorage.getItem('cachedPosts');
        console.log(cachedData)
        if (cachedData) {
          setPosts(JSON.parse(cachedData));
        } else {
          // Fetch data from the API
          const response = await axios.get('https://admin.desh365.top/api/all-post');
          const postData = response.data.data.posts.slice(0, 10);
          // Update state with fetched data
          setPosts(postData);
          // Cache the fetched data
          localStorage.setItem('cachedPosts', JSON.stringify(postData));
        }
      } catch (error) {
        console.error('Error fetching the posts:', error);
      }
    };
    // console.log(cachedData)

    fetchPosts();
  }, []);

  return (
    <div>
    <div className='w-[100%] h-[410px] py-4 shadow-lg overflow-x-scroll'>
      <div className='flex flex-col space-y-4 gap-3 py-4'>
        {posts.map(post => {
          const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
          return (
            <Link href={`Pages/post/${post?.id}`} key={post?.id}>
              <div className='flex gap-2 justify-center items-center hover:underline' key={post?.id}>
                <img className='w-20 rounded-md transition-all duration-300 hover:scale-110' src={imageUrl} alt={post.title} />
                <h2 className='text-[14px]'>{post.title}</h2>
              </div>
              <div className='border borber-b'></div>
            </Link>
          );
        })}
      </div>

     
    </div>
    </div>
  );
};

export default AllPost;