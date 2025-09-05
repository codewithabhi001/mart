'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/data/products';
import { useCart } from '@/lib/context/cart-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter();
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Button onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Share Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Add to Wishlist
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center space-x-2 mt-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Variants */}
          {product.variants && (
            <div>
              <h3 className="font-semibold mb-3">Choose Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.name} - ₹{variant.price}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-800">₹{currentPrice}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-500">
                  {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <p className="text-gray-600">
              Per {selectedVariant ? selectedVariant.unit : product.unit}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quantity:</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                {currentStock} available
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-6 py-3 rounded-xl shadow-md"
            onClick={handleAddToCart}
            disabled={currentStock === 0}
          >
            Add to Cart - ₹{currentPrice * quantity}
          </Button>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Brand:</span>
                  <p>{product.brand}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Unit:</span>
                  <p>{product.unit}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <p>{product.category}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Stock:</span>
                  <p>{currentStock} items</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              {product.nutritionalInfo ? (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Calories:</span>
                    <p>{product.nutritionalInfo.calories} kcal</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Protein:</span>
                    <p>{product.nutritionalInfo.protein}g</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Fat:</span>
                    <p>{product.nutritionalInfo.fat}g</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Carbs:</span>
                    <p>{product.nutritionalInfo.carbs}g</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Fiber:</span>
                    <p>{product.nutritionalInfo.fiber}g</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Nutritional information not available</p>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 ${star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-gray-500">Detailed reviews coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
