import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://admin.desh365.top/api/structure');
                const data = response.data;
                if (data.status) {
                    setCategories(data.structure.category_menu);
                }
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <ul className='flex gap-4'>
                {categories.map((category, index) => (
                    <li key={index}>
                        {category.key === 'category' ? (
                            <Link href={`/category/${category.id}`}>
                                <p>{category.name}</p>
                            </Link>
                        ) : (
                            <Link href={`/${category.id}`}>
                                <p>{category.name}</p>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
