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
const ErrorGuard = dynamic(() => import('@/components/client/error-guard'), { ssr: false });

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
        {/* Early inline fetch override to block known injected analytics (FullStory) before they run */}
        <script dangerouslySetInnerHTML={{__html: `(function(){
          try{
            var orig = window.fetch;
            window.fetch = function(){
              try{
                var input = arguments[0];
                var url = '';
                if(typeof input === 'string') url = input;
                else if(input && input.url) url = input.url;
                if(url && (url.indexOf('fullstory.com')!==-1 || url.indexOf('edge.fullstory.com')!==-1 || url.indexOf('static.fullstory.com')!==-1)){
                  return Promise.resolve(new Response(null,{status:204,statusText:'No Content (blocked)'}));
                }
              }catch(e){}
              return orig.apply(this, arguments);
            };
          }catch(e){}
        })();`}} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FetchGuard />
          {/* Suppress noisy errors from injected analytics in preview */}
          <ErrorGuard />
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
