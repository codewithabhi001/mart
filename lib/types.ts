export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  unit: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  brand: string;
  variants?: ProductVariant[];
  nutritionalInfo?: NutritionalInfo;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: Address[];
  orderHistory: Order[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  orderDate: string;
  deliveryDate?: string;
  paymentMethod: 'cod' | 'online';
  couponCode?: string;
  discount?: number;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
}

export interface Location {
  pincode: string;
  city: string;
  state: string;
  area: string;
}