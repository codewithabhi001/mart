'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/products';

interface FilterSidebarProps {
  filters: {
    priceRange: number[];
    rating: number;
    brands: string[];
  };
  setFilters: (filters: any) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const brands = [...new Set(products.map(p => p.brand))];

  const updateBrands = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    setFilters({ ...filters, brands: newBrands });
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 500],
      rating: 0,
      brands: [],
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 border space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={filters.rating === rating}
                onCheckedChange={(checked) => 
                  setFilters({ ...filters, rating: checked ? rating : 0 })
                }
              />
              <span className="text-sm flex items-center">
                {rating}+ ⭐
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-3">Brands</h4>
        <div className="space-y-2 max-h-40 overflow-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => updateBrands(brand, !!checked)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}