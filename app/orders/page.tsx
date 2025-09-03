import Header from '@/components/header/header';
import OrdersPage from '@/components/orders/orders-page';
import Footer from '@/components/footer/footer';

export default function Orders() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <OrdersPage />
      <Footer />
    </main>
  );
}