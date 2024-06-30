'use client';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loader from '../Shared/Loader';

const AllPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategory, setMainCategory] = useState(null);

  useEffect(() => {
    const cachedMainCategory = localStorage.getItem('mainCategory');
    const cachedData = localStorage.getItem('postsData');

    if (cachedMainCategory && cachedData) {
      setMainCategory(JSON.parse(cachedMainCategory));
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      // Fetch the structure data first
      axios.get('https://admin.desh365.top/api/structure')
        .then((response) => {
          console.log('Fetched Structure Data:', response.data);
          const fetchedMainCategory = response.data.structure.main_category;
          setMainCategory(fetchedMainCategory);
          localStorage.setItem('mainCategory', JSON.stringify(fetchedMainCategory));
        })
        .catch((error) => {
          console.error("Error fetching structure data:", error);
        });

      // Fetch the posts data
      axios.get('https://admin.desh365.top/api/all-post')
        .then((response) => {
          console.log('Fetched Data:', response.data);
          const fetchedData = response.data.data;
          setData(fetchedData);
          localStorage.setItem('postsData', JSON.stringify(fetchedData));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(post => post.category_id == mainCategory);
  }, [data, mainCategory]);

  if (loading) {
    return <div>
      <Loader/>
    </div>;
  }

  console.log(data);

  return (
    <div>
      <div className='shadow-xl w-[100%] mt-4 h-[390px] overflow-x-scroll'>
        <div className='flex flex-col space-y-4 gap-3 py-4'>
          {filteredData.map(post => {
            const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
            return (
              <Link href={`/details/${post?.id}`} key={post?.id}>
                <div className='flex gap-2 items-center hover:underline' key={post?.id}>
                  <img className='w-24 h-24 transition-all duration-300 hover:scale-110 rounded-md' src={imageUrl} alt={post.title} />
                  <h2>{post.title}</h2>
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
