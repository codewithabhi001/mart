'use client';

import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/context/cart-context';
import { availableCoupons } from '@/lib/data/coupons';
import { toast } from 'sonner';
import CouponSelector from './coupon-selector';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => 
      c.code === couponInput && c.isActive && total >= c.minOrder
    );

    if (coupon) {
      setAppliedCoupon(coupon.code);
      toast.success(`Coupon ${coupon.code} applied successfully!`);
    } else {
      toast.error('Invalid or expired coupon code');
    }
    setCouponInput('');
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const coupon = availableCoupons.find(c => c.code === appliedCoupon);
    if (!coupon) return 0;

    if (coupon.type === 'percentage') {
      const discount = (total * coupon.discount) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    }
    
    return coupon.discount;
  };

  const discount = getDiscount();
  const finalTotal = total - discount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600">Add some products to get started</p>
          <Link href="/products">
            <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl p-6 border card-hover">
              <div className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-50"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.unit}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">₹{item.product.price}</span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Coupon Section */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="font-semibold mb-4">Apply Coupon</h3>
            
            {appliedCoupon && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-green-800 font-medium">{appliedCoupon}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Input
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              />
              <Button onClick={applyCoupon} variant="outline">
                Apply
              </Button>
            </div>

            <CouponSelector onCouponSelect={(code) => {
              setCouponInput(code);
              applyCoupon();
            }} />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{total}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-green-600">FREE</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button
                size="lg"
                className="w-full mt-6 bg-primary-green hover:bg-primary-green/90 text-white"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
