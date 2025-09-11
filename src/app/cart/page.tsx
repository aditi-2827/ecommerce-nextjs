'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { fetchItemDetails, calculateTotal } from '@/utils/cart-helpers';
import { Item } from '@/types/models';
import Link from 'next/link';

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [itemDetails, setItemDetails] = useState<Record<string, Item>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItemDetails = async () => {
      setIsLoading(true);
      
      if (items.length > 0) {
        const itemIds = items.map(item => item.itemId);
        const details = await fetchItemDetails(itemIds);
        setItemDetails(details);
      }
      
      setIsLoading(false);
    };
    
    getItemDetails();
  }, [items]);
  
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    updateQuantity(itemId, newQuantity);
  };
  
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };
  
  const total = calculateTotal(items, itemDetails);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="text-center py-8">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-center px-6 py-3 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Price</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((cartItem) => {
                  const item = itemDetails[cartItem.itemId];
                  
                  // Skip if item details not found
                  if (!item) return null;
                  
                  return (
                    <tr key={cartItem.itemId}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center mr-4">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover rounded" 
                              />
                            ) : (
                              <span className="text-xs text-gray-500">No image</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleUpdateQuantity(cartItem.itemId, cartItem.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                            disabled={cartItem.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-3 w-8 text-center">{cartItem.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(cartItem.itemId, cartItem.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-medium">${(item.price * cartItem.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleRemoveItem(cartItem.itemId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-gray-500 mb-1">
                {user ? (
                  'Logged in as ' + user.email
                ) : (
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in to save your cart
                  </Link>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-gray-700 mb-1">Total: ${total.toFixed(2)}</p>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => alert('Checkout functionality would be implemented here')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
