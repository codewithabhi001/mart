'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Heart, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/context/cart-context';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 group hover:-translate-y-0.5">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {showDiscount && discountPercent > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold px-2 py-1 text-xs">
              {discountPercent}% OFF
            </Badge>
          )}

          {/* Delivery Time Badge */}
          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>10 min</span>
          </div>

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success('Added to wishlist');
            }}
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm leading-tight group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Unit */}
          <p className="text-xs text-gray-500 font-medium">{product.unit}</p>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl py-2 transition-all duration-300 shadow-md hover:shadow-lg"
            size="sm"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
