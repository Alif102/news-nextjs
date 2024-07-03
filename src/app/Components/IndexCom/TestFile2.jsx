"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestFile2 = () => {
  const [posts, setPosts] = useState([]);
  const [secondCategory, setSecondCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch structure data
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');
        const structure = structureResponse.data.structure;
        setSecondCategory(parseInt(structure.second_category, 10));

        // Fetch all posts data
        const postsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const allPosts = postsResponse.data.data;

        // Filter posts by second_category
        const filteredPosts = allPosts
          .flatMap(postGroup => postGroup.posts)
          .filter(post => post.category_id === parseInt(structure.second_category, 10));

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Filtered Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.post_body}</p>
              <img src={`https://admin.desh365.top/storage/${post.image}`} alt={post.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default TestFile2;
