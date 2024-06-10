'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCategories } from '../service/productsService';

const ProductsCategories: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Product Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className="category-button bg-purple-600 text-white py-2 px-4 rounded-md shadow hover:bg-purple-700 transition"
            onClick={() => {
              router.push(`/categories/${category}/products`);
            }}
          >
            <span className="mr-2">
            </span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsCategories;
