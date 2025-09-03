import Header from '@/components/header/header';
import CheckoutPage from '@/components/checkout/checkout-page';
import Footer from '@/components/footer/footer';

export default function Checkout() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <CheckoutPage />
      <Footer />
    </main>
  );
}