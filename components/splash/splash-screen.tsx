'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SplashScreen() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-green to-primary-orange'
    }`}>
      <div className="text-center space-y-8">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`${isDark ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/20'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        {/* Logo Animation */}
        <div className="relative">
          <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center animate-pulse ${
            isDark ? 'bg-white' : 'bg-white/20 backdrop-blur-sm'
          }`}>
            <ShoppingCart className={`w-12 h-12 ${isDark ? 'text-primary-green' : 'text-white'}`} />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-3xl border-4 border-white/30 animate-ping" />
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <h1 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-white'}`}>
            ILB Mart
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-white/90'}`}>
            Fresh groceries delivered in minutes
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full animate-bounce ${
                isDark ? 'bg-white' : 'bg-white/80'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}