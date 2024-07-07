import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Header = ({ id }) => {
    const [categoryMenu, setCategoryMenu] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://admin.desh365.top/api/structure');
                const data = response.data;
                if (data.status) {
                    const menuItems = data.structure.category_menu.split(',');
                    setCategoryMenu(menuItems);
                }
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const renderMenuItem = (item) => {
        const parts = item.split('_');
        const type = parts[0];
        const name = parts.slice(1, -1).join('_'); // Join name parts excluding type and id
        const itemId = parts[parts.length - 1]; // Extract id

        switch (type) {
            case 'category':
                return (
                    <li key={item}>
                        <Link href={`/category/${itemId}`}>
                            <p>{name.replace(/%20/g, ' ')}</p>
                        </Link>
                    </li>
                );
            case 'customlink':
                return (
                    <li key={item}>
                        <Link href={`http://${itemId}`}>
                            {name.replace(/%20/g, ' ')}
                        </Link>
                    </li>
                );
            case 'page':
                return (
                    <li key={item}>
                        <Link href={`/${name}`}>
                            <p>{name.replace(/%20/g, ' ')}</p>
                        </Link>
                    </li>
                );
            default:
                return null;
        }
    };

    const fetchDataByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`https://admin.desh365.top/api/category-post/${categoryId}`);
            const data = response.data;
            console.log(data); // Log the data when category_id matches categoryId
        } catch (error) {
            console.error('Error fetching category data', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDataByCategory(id); // Fetch data for the dynamic category_id on component mount or change
        }
    }, [id]);

    return (
        <div>
            <ul className='flex justify-around gap-5'>
                {categoryMenu.map((item) => renderMenuItem(item))}
            </ul>
        </div>
    );
};

export default Header;
