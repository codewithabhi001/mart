'use client';

import React from 'react';
import { Clock, Truck, Shield, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/lib/context/location-context';
import Link from 'next/link';

export default function HeroSection() {
  const { currentLocation } = useLocation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-lime-500 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-center min-h-screen py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Location Badge */}
            {currentLocation && (
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Delivering to {currentLocation.area}</span>
              </div>
            )}

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block">Fresh Groceries</span>
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  in 10 Minutes
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Get fresh groceries, fruits, vegetables, and daily essentials delivered to your doorstep instantly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                  Order Now
                </Button>
              </Link>
              <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 text-lg px-8 py-4 rounded-full font-semibold">
                Download App
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">10-Min Delivery</h3>
                <p className="text-white/80 text-sm text-center">Lightning fast delivery to your doorstep</p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Free Delivery</h3>
                <p className="text-white/80 text-sm text-center">No delivery charges on any order</p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Quality Assured</h3>
                <p className="text-white/80 text-sm text-center">Fresh products with quality guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
