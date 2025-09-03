import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="text-xl font-bold">GroceryMart</span>
            </div>
            <p className="text-gray-400 text-sm">
              Fresh groceries delivered to your doorstep in minutes. Quality assured, always fresh.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/products" className="block text-gray-400 hover:text-white">Products</Link>
              <Link href="/categories" className="block text-gray-400 hover:text-white">Categories</Link>
              <Link href="/deals" className="block text-gray-400 hover:text-white">Deals & Offers</Link>
              <Link href="/about" className="block text-gray-400 hover:text-white">About Us</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2 text-sm">
              <Link href="/help" className="block text-gray-400 hover:text-white">Help Center</Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white">Returns & Refunds</Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white">Shipping Info</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white">Contact Us</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@grocerymart.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
            <Link href="/returns" className="block text-gray-400 hover:text-white">Returns & Refunds</Link>
            <Link href="/privacy" className="block text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-gray-400 hover:text-white">Terms & Conditions</Link>
            <Link href="/about" className="block text-gray-400 hover:text-white">About Us</Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 GroceryMart. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
  )
}