import Header from '@/components/header/header';
import SplashScreen from '@/components/splash/splash-screen';
import HomePage from '@/components/home/home-page';
import Footer from '@/components/footer/footer';
import { useAuth } from '@/lib/context/auth-context';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash || isLoading) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <HomePage />
      <Footer />
    </main>
  );
}