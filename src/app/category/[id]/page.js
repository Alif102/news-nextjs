"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CommonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) { // Make sure 'id' is available before fetching
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://admin.desh365.top/api/category-post/${id}`);
          console.log(response.data.data);
          setCategories(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  console.log(categories);

  return (
    <div>
        <h1>cateee</h1>
      {/* <NavbarPage categories={categories} /> */}
    </div>
  );
};

export default CommonPage;
