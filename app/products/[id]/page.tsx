import Header from '@/components/header/header';
import ProductDetails from '@/components/products/product-details';
import Footer from '@/components/footer/footer';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <ProductDetails productId={params.id} />
      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  // Replace with your actual product IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}