'use client';

"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Package, Clock, CheckCircle, Truck, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

interface OrderTrackingPageProps {
  orderId: string;
}

const orderStatuses = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, time: '3 mins ago', completed: true },
  { id: 'preparing', label: 'Preparing Your Order', icon: Package, time: '2 mins ago', completed: true },
  { id: 'on-the-way', label: 'On the Way', icon: Truck, time: 'Now', completed: true },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle, time: '', completed: false },
];

export default function OrderTrackingPage({ orderId }: OrderTrackingPageProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(2); // 0:confirmed,1:preparing,2:on-the-way,3:delivered
  const [estimatedTime, setEstimatedTime] = useState(8);
  const [progress, setProgress] = useState(75);

  const [mounted, setMounted] = useState(false);
  const [demoOrder, setDemoOrder] = useState<any | null>(null);

  // Load order from localStorage on client only
  useEffect(() => {
    setMounted(true);
    try {
      const orders = JSON.parse(localStorage.getItem('grocery-orders') || 'null') || [];
      const found = orders.find((o: any) => o.id === orderId) || null;
      if (found) {
        setDemoOrder(found);
        const idx = ['confirmed','preparing','on-the-way','delivered'].indexOf(found.status);
        if (idx >= 0) setCurrentStatus(idx);
        if (typeof found.estimatedMinutes === 'number') setEstimatedTime(found.estimatedMinutes);
      } else {
        setDemoOrder({
          id: orderId,
          items: [
            { name: 'Fresh Bananas', quantity: 2, price: 40, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { name: 'Whole Milk', quantity: 1, price: 60, image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { name: 'Brown Bread', quantity: 1, price: 45, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400' },
          ],
          total: 145,
          address: '123 Main Street, Mumbai, Maharashtra 400001',
          deliveryPartner: 'Raj Kumar',
          phone: '+91 98765 43210',
          rating: 4.8,
          status: 'on-the-way',
          estimatedMinutes: 8,
        });
      }
    } catch (e) {
      setDemoOrder({
        id: orderId,
        items: [
          { name: 'Fresh Bananas', quantity: 2, price: 40, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400' },
          { name: 'Whole Milk', quantity: 1, price: 60, image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400' },
          { name: 'Brown Bread', quantity: 1, price: 45, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400' },
        ],
        total: 145,
        address: '123 Main Street, Mumbai, Maharashtra 400001',
        deliveryPartner: 'Raj Kumar',
        phone: '+91 98765 43210',
        rating: 4.8,
        status: 'on-the-way',
        estimatedMinutes: 8,
      });
    }
  }, [orderId]);

  // Simulate progression every 10s for demo (only when mounted)
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
      setProgress(prev => Math.min(100, prev + 5));

      setCurrentStatus((prev) => {
        const next = Math.min(3, prev + 1);
        // persist to localStorage
        try {
          const orders = JSON.parse(localStorage.getItem('grocery-orders') || 'null') || [];
          const idx = orders.findIndex((x: any) => x.id === orderId);
          if (idx >= 0) {
            orders[idx].status = ['confirmed','preparing','on-the-way','delivered'][next];
            localStorage.setItem('grocery-orders', JSON.stringify(orders));
          }
        } catch(e) {}
        return next;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [mounted, orderId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Track Order</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Status Card */}
            <Card className="shadow-lg border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Order #{orderId}</span>
                  </CardTitle>
                  <Badge className="bg-green-500 text-white">On the Way</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ETA Section */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{estimatedTime} mins</h3>
                  <p className="text-gray-600 mb-4">Estimated delivery time</p>
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-sm text-gray-500 mt-2">{progress}% completed</p>
                </div>

                {/* Status Timeline */}
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => (
                    <div key={status.id} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        index <= currentStatus 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <status.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          index <= currentStatus ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {status.label}
                        </h4>
                        {status.time && index <= currentStatus && (
                          <p className="text-sm text-gray-600">{status.time}</p>
                        )}
                      </div>
                      {index === currentStatus && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Partner */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-600" />
                  <span>Your Delivery Partner</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {demoOrder?.deliveryPartner?.charAt(0) ?? '?'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{demoOrder?.deliveryPartner ?? '—'}</h4>
                      <p className="text-gray-600">Delivery Executive</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{demoOrder?.rating ?? '—'}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Map Placeholder */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Live Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">Live map tracking would appear here</p>
                    <p className="text-sm text-gray-500 mt-2">Your delivery partner is 2.5 km away</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(demoOrder.items || []).map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{demoOrder?.total ?? '—'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 font-medium">{demoOrder ? (typeof demoOrder.address === 'string' ? demoOrder.address : (
                    demoOrder.address ? `${demoOrder.address.street || ''}${demoOrder.address.city ? ', ' + demoOrder.address.city : ''}${demoOrder.address.state ? ', ' + demoOrder.address.state : ''}${demoOrder.address.pincode ? ' - ' + demoOrder.address.pincode : ''}` : '—'
                  )) : '—'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50">
                Cancel Order
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                Need Help?
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                Share Live Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
