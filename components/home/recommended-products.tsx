'use client';

import React from 'react';
import ProductCard from '@/components/products/product-card';
import { products } from '@/lib/data/products';
import { useAuth } from '@/lib/context/auth-context';

export default function RecommendedProducts() {
  const { user } = useAuth();
  
  // Simple recommendation logic - in real app this would be AI-powered
  const recommendedProducts = products.slice(0, 6);

  if (!user) return null;

  return (
    <section className="py-12 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Recommended for You</h2>
            <p className="text-gray-600 mt-2">Based on your previous orders</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}