'use client';

import { useItems } from '@/hooks/use-items';
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
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl overflow-hidden mb-12 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Amazing Products</h1>
            <p className="text-blue-100 text-lg mb-6">Shop the latest trends with free shipping on all orders over $50.</p>
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 p-4">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Featured Products" 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Shop Products</h2>
      
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
