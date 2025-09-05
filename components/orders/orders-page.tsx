'use client';

import React from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';

const demoOrders = [
  {
    id: '1',
    date: '2025-01-02',
    status: 'delivered',
    total: 450,
    items: 5,
    deliveryTime: '8 mins',
  },
  {
    id: '2',
    date: '2025-01-01',
    status: 'on-the-way',
    total: 320,
    items: 3,
    deliveryTime: '12 mins',
  },
  {
    id: '3',
    date: '2024-12-30',
    status: 'delivered',
    total: 180,
    items: 2,
    deliveryTime: '6 mins',
  },
];

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'on-the-way':
        return <Truck className="w-5 h-5 text-green-500" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'on-the-way':
        return <Badge className="bg-green-500">On the Way</Badge>;
      case 'preparing':
        return <Badge className="bg-amber-500">Preparing</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      {demoOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping and your orders will appear here</p>
          <Button className="bg-primary hover:bg-primary/90">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {demoOrders.map((order) => (
            <Card key={order.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Items:</span>
                    <p className="font-medium">{order.items} items</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total:</span>
                    <p className="font-medium">₹{order.total}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery:</span>
                    <p className="font-medium">{order.deliveryTime}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
