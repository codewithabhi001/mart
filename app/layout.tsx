import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/context/cart-context';
import { AuthProvider } from '@/lib/context/auth-context';
import { LocationProvider } from '@/lib/context/location-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GroceryMart - Fresh Groceries Delivered in Minutes',
  description: 'Get fresh groceries, fruits, vegetables, and daily essentials delivered to your doorstep in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}