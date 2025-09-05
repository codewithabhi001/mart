'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data/products';

export default function CategorySection() {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="text-center p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-white flex items-center justify-center border">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 mt-3 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
