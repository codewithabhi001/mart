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
import CartItemRow from './cart-item-row';

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
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mt-2">Looks like you haven&apos;t added anything to your cart yet.</p>
          <div className="mt-6">
            <Link href="/products">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6">Start Shopping</Button>
            </Link>
          </div>
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
            <CartItemRow
              key={item.product.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
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
