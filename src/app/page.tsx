'use client';

import { useItems } from '@/hooks/use-items';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Home() {
  const { 
    items, 
    isLoading, 
    error, 
    filters, 
    setCategory, 
    setMinPrice, 
    setMaxPrice 
  } = useItems();
  
  const { addToCart } = useCart();
  
  // Available categories (would normally come from API)
  const categories = ['Electronics', 'Clothing', 'Books', 'Home'];
  
  const handleAddToCart = (itemId: string) => {
    addToCart(itemId, 1);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select 
              id="category"
              className="w-full p-2 border rounded-md"
              value={filters.category}
              onChange={(e) => setCategory(e.target.value)}
              title="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              id="minPrice"
              type="number"
              min="0"
              step="1"
              className="w-full p-2 border rounded-md"
              value={filters.minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Minimum price"
              title="Set minimum price"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              step="1"
              className="w-full p-2 border rounded-md"
              value={filters.maxPrice === Infinity ? "" : filters.maxPrice}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : Infinity;
                setMaxPrice(value);
              }}
              placeholder="Maximum price"
              title="Set maximum price"
            />
          </div>
        </div>
        
        {/* Product listing */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">No products found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-1">{item.category}</p>
                    <p className="text-xl font-bold mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAddToCart(item.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
