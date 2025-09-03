import Header from '@/components/header/header';
import ProductListing from '@/components/products/product-listing';
import Footer from '@/components/footer/footer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <ProductListing />
      <Footer />
    </main>
  );
}