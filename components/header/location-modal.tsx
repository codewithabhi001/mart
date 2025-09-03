'use client';

import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocation } from '@/lib/context/location-context';
import { toast } from 'sonner';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [pincode, setPincode] = useState('');
  const { setLocation, checkServiceAvailability } = useLocation();

  const handleLocationSelect = () => {
    if (!pincode || pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    const isAvailable = checkServiceAvailability(pincode);
    
    const location = {
      pincode,
      city: pincode.startsWith('400') ? 'Mumbai' : pincode.startsWith('110') ? 'Delhi' : 'Bangalore',
      state: pincode.startsWith('400') ? 'Maharashtra' : pincode.startsWith('110') ? 'Delhi' : 'Karnataka',
      area: `Area ${pincode.slice(-2)}`,
    };

    setLocation(location);
    
    if (isAvailable) {
      toast.success('Great! We deliver to your location');
    } else {
      toast.error('Sorry! We don\'t deliver to this location yet. We\'ll be there soon!');
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Select Location</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Enter your pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="pl-10"
              maxLength={6}
            />
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-600">Available Areas:</h4>
            <div className="grid grid-cols-2 gap-2">
              {['400001', '400002', '110001', '110002', '560001', '560002'].map((code) => (
                <Button
                  key={code}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => setPincode(code)}
                >
                  {code}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleLocationSelect}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={pincode.length !== 6}
          >
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}