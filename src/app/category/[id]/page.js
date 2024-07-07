// src/app/category/[id]/page.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPage = ({ id }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://admin.desh365.top/api/category-post/${id}`);
                const data = response.data;
                if (data.status) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error('Error fetching posts', error);
                setPosts([]); // Set posts to empty array in case of error or no data
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <h1>Category {id} Page</h1>
            <div className="posts">
                {posts.length === 0 ? (
                    <p>No posts found for this category.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post">
                            <h2>{post.title}</h2>
                            <p>{post.short_url}</p>
                            {/* Add more fields as needed */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
