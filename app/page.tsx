'use client';
import Header from '@/components/header/header';
import HomePage from '@/components/home/home-page';
import Footer from '@/components/footer/footer';
import { useAuth } from '@/lib/context/auth-context';
import { useEffect } from 'react';

export default function Home() {
  const { isLoading } = useAuth();

  // No splash screen: directly render home. If auth is loading, still render skeleton HomePage.
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <HomePage />
      <Footer />
    </main>
  );
}
