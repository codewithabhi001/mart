"use client";

"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import SiteHeader from '@/components/header/header';
import OrderTrackingPage from '@/components/order/order-tracking-page';
import Footer from '@/components/footer/footer';
import { useParams } from 'next/navigation';

export default function OrderTrackingClient() {
  const params = useParams();
  const id = params?.id || '';

  return (
    <main className="min-h-screen bg-cream-light">
      <SiteHeader />
      <OrderTrackingPage orderId={id} />
      <Footer />
    </main>
  );
}
