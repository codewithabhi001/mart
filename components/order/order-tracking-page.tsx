'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface OrderTrackingPageProps {
  orderId: string;
}

const orderStatuses = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, time: '2 mins ago' },
  { id: 'preparing', label: 'Preparing Your Order', icon: Package, time: '1 min ago' },
  { id: 'on-the-way', label: 'On the Way', icon: Truck, time: 'Now' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle, time: '' },
];

export default function OrderTrackingPage({ orderId }: OrderTrackingPageProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(2); // On the way
  const [estimatedTime, setEstimatedTime] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const demoOrder = {
    id: orderId,
    items: [
      { name: 'Fresh Bananas', quantity: 2, price: 40 },
      { name: 'Whole Milk', quantity: 1, price: 60 },
      { name: 'Brown Bread', quantity: 1, price: 45 },
    ],
    total: 145,
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    deliveryPartner: 'Raj Kumar',
    phone: '+91 98765 43210',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Track Order</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{orderId}</span>
                <Badge className="bg-blue-500">On the Way</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ETA */}
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <h3 className="text-2xl font-bold text-blue-800">{estimatedTime} mins</h3>
                <p className="text-blue-600">Estimated delivery time</p>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                {orderStatuses.map((status, index) => (
                  <div key={status.id} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStatus 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <status.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        index <= currentStatus ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {status.label}
                      </h4>
                      {status.time && index <= currentStatus && (
                        <p className="text-sm text-gray-600">{status.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Partner */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Partner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {demoOrder.deliveryPartner.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{demoOrder.deliveryPartner}</h4>
                    <p className="text-sm text-gray-600">Delivery Executive</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{demoOrder.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Delivery Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{demoOrder.address}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Cancel Order
            </Button>
            <Button variant="outline" className="w-full">
              Need Help?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}