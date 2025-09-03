'use client';

import React from 'react';
import HeroSection from './hero-section';
import CategorySection from './category-section';
import TrendingProducts from './trending-products';
import DealsSection from './deals-section';
import BannerCarousel from './banner-carousel';
import RecommendedProducts from './recommended-products';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BannerCarousel />
      <CategorySection />
      <TrendingProducts />
      <RecommendedProducts />
      <DealsSection />
    </>
  );
}