'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';
import PostBody from '../Shared/Postbody';

const ThreeCategory3 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threeCategoryThree, setthreeCategoryThree] = useState(null);

  useEffect(() => {
    // Fetch the structure data first
    axios.get('https://admin.desh365.top/api/structure') // Replace with your structure API URL
      .then((response) => {
        console.log('Fetched Structure Data:', response.data);
        setthreeCategoryThree(response.data.structure.three_category_3);
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
    return <div>
      <Loader/>
    </div>;
  }

  const filteredData = data.filter(post => post.category_id == threeCategoryThree);

  console.log(filteredData);

  return (
   <div>

     
{filteredData.length > 0 && (
                        <div className='w-full '>
                            <Link href={`Pages/post/${filteredData[0]?.id}`} key={filteredData[0]?.id}>
                            <div className='' key={filteredData[0]?.id}>
                                <div className='relative overflow-hidden ' style={{ height: '280px', }}>
                                    <Image
                                        src={`https://admin.desh365.top/public/storage/post-image/${filteredData[0]?.image}`}
                                        alt={filteredData[0]?.title || 'Default Alt Text'}
                                        layout='fill'
                                        objectFit='cover' className=' rounded-md  transition-all duration-300 hover:scale-110'
                                        priority={true}
                                    />
                                </div>

                                <h2 className='md:text-xl mt-2 text-sm font-bold'>
                                    {filteredData[0]?.title}
                                </h2>
                                {/* <PostBody postBody={filteredData[0]?.post_body} /> */}
                            </div>
                        </Link>
                        </div>
                    )}

   </div>
  
  );
};

export default ThreeCategory3;
