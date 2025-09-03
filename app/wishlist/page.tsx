import Header from '@/components/header/header';
import WishlistPage from '@/components/wishlist/wishlist-page';
import Footer from '@/components/footer/footer';

export default function Wishlist() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <WishlistPage />
      <Footer />
    </main>
  );
}