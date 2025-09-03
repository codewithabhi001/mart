import Header from '@/components/header/header';
import OffersPage from '@/components/offers/offers-page';
import Footer from '@/components/footer/footer';

export default function Offers() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <OffersPage />
      <Footer />
    </main>
  );
}