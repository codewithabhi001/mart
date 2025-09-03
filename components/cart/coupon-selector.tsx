'use client';

import React from 'react';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { availableCoupons } from '@/lib/data/coupons';
import { useCart } from '@/lib/context/cart-context';

interface CouponSelectorProps {
  onCouponSelect: (code: string) => void;
}

export default function CouponSelector({ onCouponSelect }: CouponSelectorProps) {
  const { total } = useCart();

  const validCoupons = availableCoupons.filter(coupon => 
    coupon.isActive && total >= coupon.minOrder
  );

  if (validCoupons.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Available Offers:</h4>
      <div className="space-y-2">
        {validCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="border border-dashed border-primary/30 rounded-lg p-3 cursor-pointer hover:bg-primary/5"
            onClick={() => onCouponSelect(coupon.code)}
          >
            <div className="flex items-start space-x-3">
              <Tag className="w-4 h-4 text-primary mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="text-xs">{coupon.code}</Badge>
                  <span className="text-sm font-medium">{coupon.title}</span>
                </div>
                <p className="text-xs text-gray-600">{coupon.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Min order: ₹{coupon.minOrder}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}