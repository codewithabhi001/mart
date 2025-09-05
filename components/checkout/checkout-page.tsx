'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, CreditCard, Truck, Shield, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.find((a: any) => a.isDefault)?.id || '');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  useEffect(() => {
    if (user && (!selectedAddress || selectedAddress === '')) {
      const defaultAddr = user.addresses?.find((a: any) => a.isDefault)?.id || user.addresses?.[0]?.id || '';
      if (defaultAddr) setSelectedAddress(defaultAddr);
    }
  }, [user, selectedAddress]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect to cart if no items (do not redirect while placing an order)
    if (items.length === 0 && !isPlacingOrder) {
      router.push('/cart');
      return;
    }
  }, [user, items.length, router, isPlacingOrder]);

  const deliveryFee = 0; // Free delivery
  const taxes = Math.round(total * 0.05); // 5% tax
  const packagingFee = 5;
  const finalTotal = total + deliveryFee + taxes + packagingFee;

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 1200));

    const orderId = `ORD${Date.now()}`;

    // Build order payload
    const address = (user?.addresses || []).find((a: any) => a.id === selectedAddress) || null;
    const order = {
      id: orderId,
      items: items.map(i => ({ product: i.product, quantity: i.quantity })),
      total: finalTotal,
      address,
      deliveryInstructions,
      paymentMethod: selectedPayment,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedMinutes: 15,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('grocery-orders') || 'null') || [];
      existing.unshift(order);
      localStorage.setItem('grocery-orders', JSON.stringify(existing));
    } catch (e) {
      console.warn('Failed to save order to localStorage', e);
    }

    clearCart();
    toast.success('Order placed successfully!');
    // Redirect to order success page first, user can tap Track Order to go to tracking
    router.push(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Time */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Express Delivery</h3>
                    <p className="text-green-600">Your order will be delivered in 10-15 minutes</p>
                  </div>
                  <Badge className="bg-green-500 ml-auto">FREE</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AddressSelector
                  addresses={user?.addresses || []}
                  selectedId={selectedAddress}
                  onSelect={setSelectedAddress}
                />
              </CardContent>
            </Card>

            {/* Delivery Instructions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Delivery Instructions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    placeholder="Add delivery instructions (optional)"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 focus:border-green-600 focus:ring-green-600"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">Contact-free delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">Quality guaranteed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
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
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging Fee</span>
                    <span>₹{packagingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      You&apos;re saving ₹40 on delivery!
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl py-4 shadow-lg hover:shadow-xl transition-all"
                  onClick={placeOrder}
                  disabled={isPlacingOrder || !selectedAddress}
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Placing Order...</span>
                    </div>
                  ) : (
                    `Place Order - ₹${finalTotal}`
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms & Conditions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
