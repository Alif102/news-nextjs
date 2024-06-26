"use client"
import React from 'react';
import PostBody from './Shared/Postbody';
import Image from 'next/image';
import Head from 'next/head';
import Loader from './Shared/Loader';

const DetailPage = ({ post }) => {
  const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post?.image}`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://news-nextjs-phi.vercel.app';

  if (!post) {
    return <div>
      <Loader/>
    </div>;
  }
  console.log(post);

  return (
    <div>
      <Head>
        <title>{post?.title}</title>
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.post_body?.substring(0, 150)} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <div className='p-2 space-y-5'>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='bg-blue-600 p-2 text-white rounded-lg'>
            Share on Facebook
          </button>
        </a>

        <h1 className='f text-[22px] font-bold'>{post?.title}</h1>

        <div className='rounded-md overflow-hidden relative' style={{ height: '360px', width: '50%' }}>
          <Image
            src={imageUrl}
            alt={post?.title || 'Default Alt Text'}
            layout="fill"
            objectFit="cover" priority={true}
          />
        </div>

        <PostBody postBody={post?.post_body} />
      </div>
    </div>
  );
}

export default DetailPage;
