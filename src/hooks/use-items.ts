'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/types/models';
import { ItemsResponse } from '@/types/app';

interface UseItemsProps {
  initialCategory?: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export const useItems = ({
  initialCategory,
  initialMinPrice,
  initialMaxPrice
}: UseItemsProps = {}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(initialCategory || '');
  const [minPrice, setMinPrice] = useState(initialMinPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || Infinity);
  
  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build URL with query parameters
      let url = '/api/items?';
      const params = new URLSearchParams();
      
      if (category) {
        params.append('category', category);
      }
      
      if (minPrice > 0) {
        params.append('minPrice', minPrice.toString());
      }
      
      if (maxPrice < Infinity) {
        params.append('maxPrice', maxPrice.toString());
      }
      
      url += params.toString();
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      
      const data: ItemsResponse = await response.json();
      
      if (data.items) {
        setItems(data.items);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch items when filters change
  useEffect(() => {
    fetchItems();
  }, [category, minPrice, maxPrice]);
  
  return {
    items,
    isLoading,
    error,
    filters: {
      category,
      minPrice,
      maxPrice,
    },
    setCategory,
    setMinPrice,
    setMaxPrice,
    refetch: fetchItems,
  };
};
