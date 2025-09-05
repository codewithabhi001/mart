import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/context/cart-context';
import { AuthProvider } from '@/lib/context/auth-context';
import { LocationProvider } from '@/lib/context/location-context';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
const FetchGuard = dynamic(() => import('@/components/client/fetch-guard'), { ssr: false });

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FetchGuard />
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
