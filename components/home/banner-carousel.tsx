'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    title: 'Fresh Fruits & Vegetables',
    subtitle: 'Up to 50% OFF',
    description: 'Farm fresh produce delivered instantly',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Shop Now',
    bgGradient: 'from-green-400 to-emerald-600',
    link: '/products?category=Fruits%20%26%20Vegetables',
  },
  {
    id: 2,
    title: 'Dairy & Bakery',
    subtitle: 'Buy 2 Get 1 Free',
    description: 'Fresh milk, bread, and bakery items',
    image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Explore',
    bgGradient: 'from-blue-400 to-cyan-600',
    link: '/products?category=Dairy%20%26%20Bakery',
  },
  {
    id: 3,
    title: 'Personal Care',
    subtitle: '30% OFF',
    description: 'Premium skincare and haircare products',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Shop Beauty',
    bgGradient: 'from-purple-400 to-pink-600',
    link: '/products?category=Personal%20Care',
  },
  {
    id: 4,
    title: 'Snacks & Beverages',
    subtitle: 'Flat 25% OFF',
    description: 'Your favorite snacks and drinks',
    image: 'https://images.pexels.com/photos/4959827/pexels-photo-4959827.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Order Now',
    bgGradient: 'from-orange-400 to-red-600',
    link: '/products?category=Snacks%20%26%20Packaged%20Foods',
  },
];

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bgGradient} text-white relative overflow-hidden min-h-[400px]`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center h-full p-8 md:p-12">
                  <div className="space-y-6 z-10 relative">
                    <div className="space-y-3">
                      <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <p className="text-sm font-medium">{banner.subtitle}</p>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {banner.title}
                      </h2>
                      <p className="text-lg opacity-90 leading-relaxed">{banner.description}</p>
                    </div>
                    <Link href={banner.link}>
                      <Button 
                        size="lg" 
                        className="bg-white text-gray-800 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        {banner.cta}
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className="relative z-10">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}