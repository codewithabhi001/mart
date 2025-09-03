'use client';

import React, { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Address } from '@/lib/types';
import AddressForm from '@/components/profile/address-form';

interface AddressSelectorProps {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function AddressSelector({ addresses, selectedId, onSelect }: AddressSelectorProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedId} onValueChange={onSelect}>
        {addresses.map((address) => (
          <div key={address.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
            <Label htmlFor={address.id} className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{address.type}</span>
                  {address.isDefault && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsAddingAddress(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Address
      </Button>

      {isAddingAddress && (
        <AddressForm
          onClose={() => setIsAddingAddress(false)}
          onSave={(address) => {
            // In real app, this would save to backend
            setIsAddingAddress(false);
          }}
        />
      )}
    </div>
  );
}