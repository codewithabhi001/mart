'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, ShoppingCart, User, Menu, Mic, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { useLocation } from '@/lib/context/location-context';
import LocationModal from './location-modal';
import UserMenu from './user-menu';

export default function Header() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { itemCount } = useCart();
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">GroceryMart</span>
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                onClick={() => setIsLocationModalOpen(true)}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {currentLocation ? currentLocation.area : 'Select Location'}
                </span>
                {!isServiceAvailable && (
                  <Badge variant="destructive" className="text-xs">Not Available</Badge>
                )}
              </Button>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-gray-50 border-gray-200 focus:border-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                    isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'
                  }`}
                  onClick={startVoiceSearch}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              {user && (
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Heart className="w-6 h-6" />
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative p-2">
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 bg-primary text-white min-w-[20px] h-5 rounded-full text-xs flex items-center justify-center"
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
                  <Button className="bg-primary hover:bg-primary/90">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Location */}
          <div className="md:hidden pb-3">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {currentLocation ? currentLocation.area : 'Select Location'}
              </span>
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