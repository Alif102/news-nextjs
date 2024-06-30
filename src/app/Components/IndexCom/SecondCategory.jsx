'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const SecondCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [secondCategory, setsecondCategory] = useState(null);

    useEffect(() => {
        // Fetch the structure data first
        axios.get('https://admin.desh365.top/api/structure') // Replace with your structure API URL
            .then((response) => {
                console.log('Fetched Structure Data:', response.data);
                setsecondCategory(response.data.structure.second_category);
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
            <Loader />
        </div>;
    }

    const filteredData = data.filter(post => post.category_id == secondCategory);

    console.log(data);

    return (
        <div>

            <div className='grid grid-cols-8 gap-2'>
                <div className='col-span-4'>

                    {filteredData.length > 0 && (
                        <Link href={`Pages/post/${filteredData[0]?.id}`} key={filteredData[0]?.id}>
                            <div className='' key={filteredData[0]?.id}>
                                <div className='relative' style={{ height: '380px', width: '90%' }}>
                                    <Image
                                        src={`https://admin.desh365.top/public/storage/post-image/${filteredData[0]?.image}`}
                                        alt={filteredData[0]?.title || 'Default Alt Text'}
                                        layout='fill'
                                        objectFit='cover'
                                        priority={true}
                                    />
                                </div>

                                <h2 className='md:text-xl mt-2 text-sm font-bold'>
                                    {filteredData[0]?.title}
                                </h2>
                            </div>
                        </Link>
                    )}
                </div>



             <div className='col-span-4'>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
  {filteredData.map(post => {
    const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;

    return (
      <Link href={`/details/${post?.id}`} key={post.id}>
        <div className="flex gap-2 items-center space-y-2" key={post?.id}>
          <img className="w-24 h-24" src={imageUrl} alt={post.title} />
          <h2 className='text-sm hover:underline'>{post.title}</h2>
        </div>
      </Link>
    );
  })}
</div>
             </div>
            </div>
        </div>





    );
};

export default SecondCategory;