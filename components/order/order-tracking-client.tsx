"use client";

import React from 'react';
import SiteHeader from '@/components/header/header';
import OrderTrackingPage from './order-tracking-page';
import Footer from '@/components/footer/footer';
import { useParams } from 'next/navigation';

export default function OrderTrackingClient() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : (rawId || '');

  return (
    <main className="min-h-screen bg-cream-light">
      <SiteHeader />
      <OrderTrackingPage orderId={id} />
      <Footer />
    </main>
  );
}
