"use client"
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CategoryPage = ({ params }) => {
    const { id } = params;
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (id) {
            const fetchPosts = async () => {
                try {
                    const response = await axios.get(`https://admin.desh365.top/api/category-post/${id}`);
                    const data = response.data;
                    if (data.status) {
                        setPosts(data.data);
                        if (data.data.length > 0) {
                            setCategoryName(data.data[0].category_name);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching the posts:', error);
                }
            };

            fetchPosts();
        }
    }, [id]);

    return (
        <div>
            <h1>{categoryName}</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={`https://admin.desh365.top/storage/post-image/${post.image}`} alt={post.title} />
                        <p dangerouslySetInnerHTML={{ __html: post.post_body }}></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;

