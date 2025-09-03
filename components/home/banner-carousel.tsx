'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const banners = [
  {
    id: 1,
    title: 'Fresh Fruits & Vegetables',
    subtitle: 'Up to 50% OFF',
    description: 'Farm fresh produce delivered to your doorstep',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Shop Now',
    bgColor: 'from-green-500 to-green-600',
  },
  {
    id: 2,
    title: 'Dairy & Bakery',
    subtitle: 'Buy 2 Get 1 Free',
    description: 'Fresh milk, bread, and bakery items',
    image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Explore',
    bgColor: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    title: 'Personal Care',
    subtitle: '30% OFF',
    description: 'Premium skincare and haircare products',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Shop Beauty',
    bgColor: 'from-purple-500 to-purple-600',
  },
];

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bgColor} text-white relative overflow-hidden`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-lg font-medium opacity-90">{banner.subtitle}</p>
                      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {banner.title}
                      </h2>
                      <p className="text-lg opacity-90">{banner.description}</p>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-white text-gray-800 hover:bg-gray-100 text-lg px-8"
                    >
                      {banner.cta}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
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