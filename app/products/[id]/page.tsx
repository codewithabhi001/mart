import Header from '@/components/header/header';
export const dynamic = 'force-dynamic';

import ProductDetails from '@/components/products/product-details';
import Footer from '@/components/footer/footer';
import { products } from '@/lib/data/products';

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
  return products.map((p) => ({ id: p.id }));
}
