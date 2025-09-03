import Header from '@/components/header/header';
import CartPage from '@/components/cart/cart-page';
import Footer from '@/components/footer/footer';

export default function Cart() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <CartPage />
      <Footer />
    </main>
  );
}