'use client';

import React from 'react';
import { CreditCard, Smartphone, Wallet, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Pay using Google Pay, PhonePe, Paytm',
    icon: Smartphone,
    popular: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
  },
  {
    id: 'wallet',
    name: 'Digital Wallets',
    description: 'Paytm, Amazon Pay, Mobikwik',
    icon: Wallet,
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: Banknote,
  },
];

export default function PaymentSelector({ selectedMethod, onSelect }: PaymentSelectorProps) {
  return (
    <RadioGroup value={selectedMethod} onValueChange={onSelect}>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 ${selectedMethod === method.id ? 'border-green-300 bg-green-50' : ''}`}>
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-3">
                <method.icon className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{method.name}</span>
                    {method.popular && (
                      <span className="text-xs bg-primary-green text-white px-2 py-1 rounded">Popular</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
