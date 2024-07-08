"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = ({ params }) => {
  const id = params.id;

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async (id) => {
      try {
        const response = await axios.get(`http://admin.desh365.top/api/category-post/${id}`);
        const data = response.data;
        console.log(data);
        if (data.status) {
          setPosts(data.data); // Updating state with data.data
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.post_body}</p>
            <img src={`http://admin.desh365.top/storage/${post.image}`} alt={post.title} />
            <p>Category: {post.category_name}</p>
            {/* Render other post details as needed */}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
