'use client';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Store</h1>
        <nav>
          <a href="/create-product" className="text-xl font-bold hover:text-gray-200">Create Product</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

