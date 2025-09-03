import Header from '@/components/header/header';
import HeroSection from '@/components/home/hero-section';
import CategorySection from '@/components/home/category-section';
import TrendingProducts from '@/components/home/trending-products';
import DealsSection from '@/components/home/deals-section';
import Footer from '@/components/footer/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <HeroSection />
      <CategorySection />
      <TrendingProducts />
      <DealsSection />
      <Footer />
    </main>
  );
}