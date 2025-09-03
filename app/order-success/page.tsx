import Header from '@/components/header/header';
import OrderSuccessPage from '@/components/order/order-success-page';
import Footer from '@/components/footer/footer';

export default function OrderSuccess() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <OrderSuccessPage />
      <Footer />
    </main>
  );
}