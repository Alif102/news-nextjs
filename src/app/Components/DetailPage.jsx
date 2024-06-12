"use client"
import React, { useEffect } from 'react';
import PostBody from './Shared/Postbody';
import Image from 'next/image';
// import Link from 'next/link';


// export const metadata = {
//   title: 'Blog',
//   openGraph: {
//     title: 'Blog',
//   },
// }

const DetailPage = ({ post }) => {
  const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post?.image}`;
  const currentUrl = 'https://news-nextjs-phi.vercel.app/'
  // useEffect(() => {

  //   document.title = post?.title || 'news detail';
  // }, [post]);

  if (!post) {
    return <div>Loading...</div>;
  }
  console.log(post)


  return (
    <div>
     
     
      {/* <Head>
        <title>titleeeeee</title>
        <meta property="og:title" content='page details'/>
        <meta property="og:image" content='https://admin.desh365.top/public/storage/post-image/4598_1716725277.webp' />
        <meta property="og:url" content='https://newsportalnextjs.vercel.app/Pages/post/16' />
        <meta property="og:type" content="article" />
   
      </Head> */}

      <div className='p-2 space-y-5' >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${(currentUrl)}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='b bg-blue-600 p-2 text-white rounded-lg'>
            Share on Facebook
          </button>
        </a>


        <h1 className='f text-[22px]  font-bold'> {post?.title} </h1>


        {/* <img className='h-[400px] w-full rounded-md' src={imageUrl} alt={post?.title} /> */}
        <div className='rounded-md overflow-hidden relative' style={{ height: '360px', width: '100%' }}>
          <Image
            src={imageUrl}
            alt={post?.title || 'Default Alt Text'}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <PostBody postBody={post?.post_body} />

      </div>




    </div>
  )
}

export default DetailPage;


{/* <Head>
        <title>{post?.title}</title>
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.Category_name} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
      </Head> */}
{/* 
      <div className='flex flex-row gap-5 justify-center mt-7'>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='b bg-blue-600 p-2 text-white rounded-lg'>
            Share on Facebook
          </button>
        </a>
        <Link href='/'>
          <button className='b bg-purple-300 p-2 rounded-lg'>Go Home</button>
        </Link>
      </div> */}

