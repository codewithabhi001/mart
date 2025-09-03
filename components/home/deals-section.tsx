'use client';

import React from 'react';
import ProductCard from '@/components/products/product-card';
import { dealProducts } from '@/lib/data/products';

export default function DealsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Best Deals</h2>
            <p className="text-gray-600 mt-2">Save big on your favorite products</p>
          </div>
          <a 
            href="/products?deals=true" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All Deals
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </div>
    </section>
  );
}