'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, ShoppingCart, User, Menu, Mic, Heart, Package, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { useLocation } from '@/lib/context/location-context';
import LocationModal from './location-modal';
import UserMenu from './user-menu';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { itemCount } = useCart();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { currentLocation, isServiceAvailable } = useLocation();

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.start();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ILB MART
              </span>
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl px-4 py-2"
                onClick={() => setIsLocationModalOpen(true)}
              >
                <MapPin className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Deliver to</div>
                  <div className="text-sm font-medium">
                    {currentLocation ? currentLocation.area : 'Select Location'}
                  </div>
                </div>
                {!isServiceAvailable && (
                  <Badge variant="destructive" className="text-xs ml-2">Not Available</Badge>
                )}
              </Button>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-gray-50 border-gray-200 focus:border-green-600 focus:ring-green-600 rounded-xl"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-lg ${
                    isListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={startVoiceSearch}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              {user && (
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm" className="relative p-3 hover:bg-green-50 hover:text-green-600 rounded-xl">
                    <Heart className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative p-3 hover:bg-green-50 hover:text-green-600 rounded-xl">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white min-w-[20px] h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User */}
              {user ? (
                <UserMenu />
              ) : (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-6 font-semibold">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="p-3 hover:bg-green-50 rounded-xl"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Mobile Menu */}
              <Button variant="ghost" size="sm" className="md:hidden p-3 hover:bg-gray-50 rounded-xl" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Location */}
          <div className="md:hidden pb-3">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 w-full justify-start"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Deliver to</div>
                <div className="text-sm font-medium">
                  {currentLocation ? currentLocation.area : 'Select Location'}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
