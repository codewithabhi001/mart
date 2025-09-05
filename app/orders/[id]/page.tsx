import SiteHeader from '@/components/header/header';
import OrderTrackingPage from '@/components/order/order-tracking-page';
import Footer from '@/components/footer/footer';

interface OrderTrackingProps {
  params: { id: string };
}

export default function OrderTracking({ params }: OrderTrackingProps) {
  return (
    <main className="min-h-screen bg-cream-light">
      <SiteHeader />
      <OrderTrackingPage orderId={params.id} />
      <Footer />
    </main>
  );
}
