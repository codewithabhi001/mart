'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';
import { useCart } from '@/lib/context/cart-context';
import { products } from '@/lib/data/products';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 3)); // Demo data

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <Heart className="w-24 h-24 mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-800">Please login to view wishlist</h2>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
    toast.success('Removed from wishlist');
  };

  const addToCart = (product: any) => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <Heart className="w-24 h-24 mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
          <p className="text-gray-600">Save products you love for later</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border overflow-hidden card-hover">
            <div className="relative aspect-square bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white text-red-500"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-600">{product.unit}</p>
              
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                size="sm"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}