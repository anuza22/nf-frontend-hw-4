'use client';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../service/productsService';
import { useQuery } from 'react-query';
import { Product } from './common/types';
import Image from 'next/image'; // Import Image component from Next.js

const Products: React.FC = () => {
  const { data: fetchedProducts, error, isLoading } = useQuery<Product[], Error>('products', getProducts);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from local storage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setLocalProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    // Combine fetched products and local storage products
    if (fetchedProducts) {
      setAllProducts([...fetchedProducts, ...localProducts]);
    } else {
      setAllProducts(localProducts);
    }
  }, [fetchedProducts, localProducts]);

  if (isLoading) return <div className="text-center text-purple-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="relative h-48 mb-4">
              {/* Image component for Next.js src link */}
              <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" className="rounded-md" />
            </div>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            {/* Tailwind CSS styles for rating and count */}
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <div className="flex mr-2">
                {/* Rating icon */}
                <i className="fas fa-star text-yellow-500 mr-1"></i>
                <span>{product.rating.rate}</span>
              </div>
              <span className="mx-2">|</span>
              <div className="flex">
                {/* Count icon */}
                <i className="fas fa-user text-purple-500 mr-1"></i>
                <span>{product.rating.count}</span>
              </div>
            </div>
            <div className="mt-4">
              {/* Replace 'ICON_LINK' with the actual link */}
              <a href="ICON_LINK" className="text-purple-600 hover:text-purple-800">
                <i className="fas fa-info-circle"></i> More Info
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
