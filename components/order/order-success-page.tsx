'use client';

import React, { useEffect } from 'react';
import { CheckCircle, Download, Package, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD123456';

  useEffect(() => {
    // Confetti animation could be added here
  }, []);

  const downloadInvoice = () => {
    // In real app, this would generate and download PDF invoice
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Invoice for Order ' + orderId;
    link.download = `invoice-${orderId}.txt`;
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-200 animate-ping" />
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your order. We're preparing your items for delivery.
          </p>
        </div>

        {/* Order Details */}
        <Card className="text-left">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order ID:</span>
              <span className="font-mono text-primary">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Delivery:</span>
              <span className="text-green-600 font-medium">10-15 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Payment Status:</span>
              <span className="text-green-600 font-medium">Confirmed</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/orders/${orderId}`}>
    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
      <Package className="w-4 h-4 mr-2" />
      Track Order
    </Button>
  </Link>
          
          <Button variant="outline" onClick={downloadInvoice}>
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <div className="space-y-3 text-sm text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Order confirmed and being prepared</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span>Quality check and packaging</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span>Out for delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span>Delivered to your doorstep</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
