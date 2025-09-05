'use client';

import React, { useState } from 'react';
import { MapPin, CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AddressSelector from './address-selector';
import PaymentSelector from './payment-selector';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses.find(a => a.isDefault)?.id || '');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const deliveryFee = 0; // Free delivery
  const taxes = Math.round(total * 0.05); // 5% tax
  const finalTotal = total + deliveryFee + taxes;

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    setIsPlacingOrder(true);
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD${Date.now()}`;
    clearCart();
    toast.success('Order placed successfully!');
    router.push(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Delivery Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AddressSelector
                addresses={user.addresses}
                selectedId={selectedAddress}
                onSelect={setSelectedAddress}
              />
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentSelector
                selectedMethod={selectedPayment}
                onSelect={setSelectedPayment}
              />
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary" />
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Express Delivery</p>
                  <p className="text-sm text-green-600">Delivered within 10-15 minutes</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>• All items are quality checked before delivery</p>
                <p>• Contact-free delivery available</p>
                <p>• 100% money-back guarantee</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                onClick={placeOrder}
                disabled={isPlacingOrder || !selectedAddress}
              >
                {isPlacingOrder ? 'Placing Order...' : `Place Order - ₹${finalTotal}`}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                By placing this order , you agree to our Terms & Conditions
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}