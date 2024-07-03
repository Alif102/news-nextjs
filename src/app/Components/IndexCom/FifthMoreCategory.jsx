'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const FifthMoreCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fifthMoreCategory, setFifthMoreCategory] = useState([]);

  useEffect(() => {
    const fetchStructureData = async () => {
      try {
        const response = await axios.get('https://admin.desh365.top/api/structure');
        const categories = response.data.structure.fifth_more_category.split(',');
        setFifthMoreCategory(categories);
      } catch (error) {
        console.error("Error fetching structure data:", error);
      }
    };

    const fetchPostsData = async () => {
      try {
        const response = await axios.get('https://admin.desh365.top/api/all-post');
        setData(response.data.data.flatMap(category => category.posts));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchStructureData();
    fetchPostsData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const filteredData = data.filter(post => fifthMoreCategory.includes(post.category_id.toString()));

  const categoryData = {};
  filteredData.forEach(post => {
    if (!categoryData[post.category_id]) {
      categoryData[post.category_id] = [];
    }
    categoryData[post.category_id].push(post);
  });

  return (
    <div>
      {Object.keys(categoryData).map(categoryId => (
        <div key={categoryId} className='grid grid-cols-8 gap-2 mb-8'>
          <div className='col-span-4'>
            {categoryData[categoryId].length > 0 && (
              <Link href={`/Pages/post/${categoryData[categoryId][0]?.id}`} key={categoryData[categoryId][0]?.id}>
                <div className='' key={categoryData[categoryId][0]?.id}>
                  <div className='relative' style={{ height: '380px', width: '90%' }}>
                    <Image
                      src={`https://admin.desh365.top/public/storage/post-image/${categoryData[categoryId][0]?.image}`}
                      alt={categoryData[categoryId][0]?.title || 'Default Alt Text'}
                      layout='fill'
                      objectFit='cover'
                      priority={true}
                    />
                  </div>
                  <h2 className='md:text-xl mt-2 text-sm font-bold'>
                    {categoryData[categoryId][0]?.title}
                  </h2>
                </div>
              </Link>
            )}
          </div>
          <div className='col-span-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {categoryData[categoryId].slice(1).map(post => (
                <Link href={`/Pages/post/${post?.id}`} key={post.id}>
                  <div className="flex gap-2 items-center space-y-2" key={post?.id}>
                    <img className="w-24 h-24" src={`https://admin.desh365.top/public/storage/post-image/${post.image}`} alt={post.title} />
                    <h2 className='text-sm hover:underline'>{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FifthMoreCategory;
