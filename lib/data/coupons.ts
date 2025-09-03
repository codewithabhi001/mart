import { Coupon } from '@/lib/types';

export const availableCoupons: Coupon[] = [
  {
    code: 'FIRST50',
    title: 'First Order Discount',
    description: 'Get 50% off on your first order',
    discount: 50,
    type: 'percentage',
    minOrder: 200,
    maxDiscount: 100,
    validUntil: '2025-03-31',
    isActive: true,
  },
  {
    code: 'SAVE100',
    title: 'Save ₹100',
    description: 'Get ₹100 off on orders above ₹500',
    discount: 100,
    type: 'fixed',
    minOrder: 500,
    validUntil: '2025-02-28',
    isActive: true,
  },
  {
    code: 'FRESH20',
    title: 'Fresh Deals',
    description: '20% off on fresh fruits and vegetables',
    discount: 20,
    type: 'percentage',
    minOrder: 150,
    maxDiscount: 75,
    validUntil: '2025-04-15',
    isActive: true,
  },
];