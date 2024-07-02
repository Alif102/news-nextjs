"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

const fetchPosts = async () => {
  const response = await fetch('https://admin.desh365.top/api/all-post');
  const data = await response.json();
  return data;
};

const TestFile2 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        // Check if data exists in local storage
        const cachedData = localStorage.getItem('posts');
        if (cachedData) {
          setPosts(JSON.parse(cachedData));
          setLoading(false);
        } else {
          // Fetch new data and update local storage
          const data = await fetchPosts();
          setPosts(data.data);
          localStorage.setItem('posts', JSON.stringify(data.data));
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className='w-[100%] h-[410px] py-4 shadow-lg overflow-x-scroll'>
      <div className='flex flex-col space-y-4 gap-3 py-4'>
        {posts.map(category => (
          <div key={category.category_id}>
            {category.posts.map(post => {
              const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
              console.log(imageUrl);  // Log the image URL
              return (
                <Link href={`Pages/post/${post?.id}`} key={post?.id}>
                  <div className='flex gap-2 justify-center items-center hover:underline' key={post?.id}>
                    <img className='w-20 rounded-md transition-all duration-300 hover:scale-110' src={imageUrl} alt={post.title} />
                    <h2 className='text-[14px]'>{post.title}</h2>
                  </div>
                  <div className='border border-b'></div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFile2;
