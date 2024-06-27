"use client"
// pages/index.js
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function TestFile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://admin.desh365.top/api/all-post') // Replace with your API URL
      .then((response) => {
        console.log('Fetched Data:', response.data); // Log the fetched data to the console
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(post => post.category_id === 6);
  }, [data]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts with Category ID 6</h1>
      <ul>
        {filteredData.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.post_body }}></p>
            <img src={post.image} alt={post.title} width={200} />
            <p>Category ID: {post.category_id}</p>
            <p>Short URL: {post.short_url}</p>
            <p>Created At: {post.created_at}</p>
            <p>Updated At: {post.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
