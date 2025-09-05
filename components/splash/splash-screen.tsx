'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function SplashScreen() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-green to-primary-orange'
    }`}>
      <div className="text-center space-y-8 relative">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="text-white"
          >
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </div>

        {/* Animated Ring + Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-8 flex items-center justify-center">
            <svg className="w-56 h-56" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#47B05A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9AE6B4" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="70" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round" className="animate-rotate-slow" />
              <circle cx="100" cy="100" r="86" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
            </svg>
          </div>

          <div className={`w-36 h-36 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm ${isDark ? 'bg-white/8 border border-white/10' : 'bg-white/20'}`}>
            <ShoppingCart className={`w-16 h-16 ${isDark ? 'text-primary-green' : 'text-white'}`} />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <h1 className={`text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-white'}`}>
            ILB MART
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-white/90'}`}>
            Fresh groceries delivered in minutes
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center space-x-4">
          <Button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold shadow-md">Shop Now</Button>
          <Button variant="outline" className="text-white border-white/30 px-6 py-3 rounded-full">Download App</Button>
        </div>
      </div>
    </div>
  );
}
