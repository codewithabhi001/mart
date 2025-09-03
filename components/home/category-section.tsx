'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data/products';

export default function CategorySection() {
  return (
    <section className="py-12 bg-white">
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
              <div className="text-center space-y-3 card-hover bg-cream-light p-6 rounded-xl border">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">
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