'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const FifthCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fifthCategory, setfifthCategory] = useState(null);

    useEffect(() => {
        // Fetch the structure data first
        axios.get('https://admin.desh365.top/api/structure') // Replace with your structure API URL
            .then((response) => {
                // console.log('Fetched Structure Data:', response.data);
                setfifthCategory(response.data.structure.fifth_category);
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

    const filteredData = data.filter(post => post.category_id == fifthCategory);

    console.log(data);

    return (
        <div>

            <div className='grid lg:grid-cols-8 gap-2'>
                <div className='lg:col-span-4 col-span-1  flex justify-center items-center'>

                    {filteredData.length > 0 && (
                        <Link href={`Pages/post/${filteredData[0]?.id}`} key={filteredData[0]?.id}>
                            <div className='' key={filteredData[0]?.id}>
                                <div className=' relative' style={{ height: '380px', width: '100%' }}>
                                    <Image className=' rounded-xl'
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



             <div className='lg:col-span-4 col-span-1'>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-2 lg:px-0 py-4">
  {filteredData.map(post => {
    const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;

    return (
      <Link href={`/Pages/post/${post?.id}`} key={post.id}>
        <div className="flex gap-2 items-center space-y-2" key={post?.id}>
          <img className="w-24 h-24 rounded-md transition-all duration-300 hover:scale-110" src={imageUrl} alt={post.title} />
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

export default FifthCategory;
