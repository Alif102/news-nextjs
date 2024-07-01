'use client';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loader from '../Shared/Loader';
import Image from 'next/image';

const AllPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategory, setMainCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the structure data first
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');
        const fetchedMainCategory = structureResponse.data.structure.main_category;
        setMainCategory(fetchedMainCategory);

        // Fetch the posts data
        const postsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const fetchedData = postsResponse.data.data;
        setData(fetchedData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(post => post.category_id == mainCategory);
  }, [data, mainCategory]);

  if (loading) {
    return <div>
      <Loader/>
    </div>;
  }

  return (
    <div>
      <div className='shadow-xl w-[100%] mt-4 h-[390px] overflow-x-scroll'>
        <div className='flex flex-col space-y-4 gap-3 py-4'>
          {filteredData.map(post => {
            const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
            return (
              <Link href={`/details/${post?.id}`} key={post?.id}>
                <div className='flex gap-2 items-center hover:underline' key={post?.id}>
                  <div className='relative w-24 h-24 transition-all duration-300 hover:scale-110 rounded-md overflow-hidden'>
                    <Image src={imageUrl} alt={post.title} layout="fill" objectFit="cover" className='rounded-md' />
                  </div>
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
