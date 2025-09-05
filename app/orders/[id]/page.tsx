"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Render the client wrapper dynamically (client component)
const OrderTrackingClient = dynamic(() => import('@/components/order/order-tracking-client'), { ssr: false });

export default function OrderTrackingPageWrapper() {
  return <OrderTrackingClient />;
}
