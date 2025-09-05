'use client';

import React, { useState } from 'react';
import { Gift, Tag, Clock, Star, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { availableCoupons } from '@/lib/data/coupons';
import { toast } from 'sonner';

const membershipBenefits = [
  {
    title: 'Free Delivery',
    description: 'Free delivery on all orders, no minimum amount',
    icon: '🚚',
  },
  {
    title: 'Priority Support',
    description: '24/7 priority customer support',
    icon: '⚡',
  },
  {
    title: 'Exclusive Deals',
    description: 'Access to member-only deals and early sales',
    icon: '🎯',
  },
  {
    title: 'Extra Cashback',
    description: 'Earn 2x cashback on every purchase',
    icon: '💰',
  },
];

const loyaltyTiers = [
  { name: 'Bronze', minSpend: 0, cashback: '1%', color: 'bg-orange-500' },
  { name: 'Silver', minSpend: 5000, cashback: '2%', color: 'bg-gray-400' },
  { name: 'Gold', minSpend: 15000, cashback: '3%', color: 'bg-yellow-500' },
  { name: 'Platinum', minSpend: 30000, cashback: '5%', color: 'bg-emerald-600' },
];

export default function OffersPage() {
  const [userSpend] = useState(8500); // Demo user spend
  const [loyaltyPoints] = useState(850);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  const currentTier = loyaltyTiers.reduce((prev, current) => 
    userSpend >= current.minSpend ? current : prev
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Offers & Rewards</h1>

      <Tabs defaultValue="coupons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCoupons.map((coupon) => (
              <Card key={coupon.code} className="relative overflow-hidden border-dashed border-2 border-primary/30">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary">{coupon.code}</Badge>
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{coupon.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Min Order:</span>
                      <span>₹{coupon.minOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Until:</span>
                      <span>{coupon.validUntil}</span>
                    </div>
                    {coupon.maxDiscount && (
                      <div className="flex justify-between">
                        <span>Max Discount:</span>
                        <span>₹{coupon.maxDiscount}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => copyCode(coupon.code)}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Copy Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-6">
          <Card className="gradient-primary text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Star className="w-6 h-6" />
                <span>ILB Mart Plus</span>
              </CardTitle>
              <p className="text-cream-medium">Premium membership for the ultimate shopping experience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-cream-medium">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div>
                  <span className="text-2xl font-bold">₹199</span>
                  <span className="text-cream-medium ml-2">/ year</span>
                </div>
                <Button className="bg-white text-primary hover:bg-cream-light">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Loyalty Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{loyaltyPoints} Points</h3>
                  <p className="text-gray-600">Available to redeem</p>
                </div>
                <Badge className={`${currentTier.color} text-white`}>
                  {currentTier.name} Member
                </Badge>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Loyalty Tiers</h4>
                {loyaltyTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-lg border-2 ${
                      tier.name === currentTier.name 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${tier.color}`} />
                        <div>
                          <h5 className="font-medium">{tier.name}</h5>
                          <p className="text-sm text-gray-600">
                            Spend ₹{tier.minSpend.toLocaleString()}+
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tier.cashback} Cashback</p>
                        {tier.name === currentTier.name && (
                          <Badge variant="outline" className="text-xs">Current</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How to Earn Points</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Earn 1 point for every ₹10 spent</li>
                  <li>• Bonus points on first order of the month</li>
                  <li>• Double points on your birthday</li>
                  <li>• Redeem 100 points = ₹10 discount</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
