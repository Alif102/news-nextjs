'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const FifthMoreCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fifthMoreCategory, setFifthMoreCategory] = useState([]);

  useEffect(() => {
    // Fetch the structure data
    axios.get('https://admin.desh365.top/api/structure') // Replace with your structure API URL
      .then((response) => {
        console.log('Fetched Structure Data:', response.data);
        const categories = response.data.structure.fifth_more_category.split(',');
        setFifthMoreCategory(categories);
      })
      .catch((error) => {
        console.error("Error fetching structure data:", error);
      });

    // Fetch the posts data
    axios.get('https://admin.desh365.top/api/all-post') // Replace with your API URL
      .then((response) => {
        console.log('Fetched Data:', response.data); // Log the fetched data to the console
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter(post => fifthMoreCategory.includes(post.category_id.toString()));

  console.log(filteredData);

  // Group posts by category_id
  const groupedData = filteredData.reduce((acc, post) => {
    if (!acc[post.category_id]) {
      acc[post.category_id] = [];
    }
    acc[post.category_id].push(post);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedData).map(([categoryId, posts]) => (
        <div key={categoryId} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Category ID: {categoryId}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map(post => (
              <Link href={`Pages/post/${post?.id}`} key={post?.id}>
                <div className='relative rounded-md overflow-hidden shadow-lg'>
                  <div className='relative w-full h-64'>
                    <Image
                      src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                      alt={post?.title || 'Default Alt Text'}
                      layout='fill'
                      objectFit='cover'
                      priority={true}
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
                  <div className='absolute bottom-0 left-0 p-4'>
                    <h2 className='text-white md:text-xl text-sm font-bold'>
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FifthMoreCategory;
