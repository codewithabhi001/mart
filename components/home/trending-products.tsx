'use client';

import React from 'react';
import ProductCard from '@/components/products/product-card';
import { trendingProducts } from '@/lib/data/products';

export default function TrendingProducts() {
  return (
    <section className="py-12 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
          <a 
            href="/products" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}