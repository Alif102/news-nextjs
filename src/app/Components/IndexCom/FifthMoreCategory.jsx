"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FifthMoreCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPostsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');

        const allPosts = allPostsResponse.data.data;
        const threeCategory1 = structureResponse.data.structure.three_category_1;

        // Filter posts where three_category_1 === category_id
        const matchedPosts = allPosts.flatMap(category => 
          category.posts.filter(post => post.category_id === parseInt(threeCategory1))
        );

        setPosts(matchedPosts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default FifthMoreCategory;
