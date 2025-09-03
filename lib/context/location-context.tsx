'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location } from '@/lib/types';

interface LocationContextType {
  currentLocation: Location | null;
  isServiceAvailable: boolean;
  setLocation: (location: Location) => void;
  checkServiceAvailability: (pincode: string) => boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const AVAILABLE_PINCODES = [
  '400001', '400002', '400003', '400004', '400005',
  '110001', '110002', '110003', '110004', '110005',
  '560001', '560002', '560003', '560004', '560005',
];

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);

  useEffect(() => {
    const savedLocation = localStorage.getItem('grocery-location');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setCurrentLocation(location);
        setIsServiceAvailable(AVAILABLE_PINCODES.includes(location.pincode));
      } catch (error) {
        console.error('Error loading location from localStorage:', error);
      }
    }
  }, []);

  const setLocation = (location: Location) => {
    setCurrentLocation(location);
    setIsServiceAvailable(AVAILABLE_PINCODES.includes(location.pincode));
    localStorage.setItem('grocery-location', JSON.stringify(location));
  };

  const checkServiceAvailability = (pincode: string): boolean => {
    return AVAILABLE_PINCODES.includes(pincode);
  };

  const value: LocationContextType = {
    currentLocation,
    isServiceAvailable,
    setLocation,
    checkServiceAvailability,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}