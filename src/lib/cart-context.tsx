'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartState, CartContextType, CartResponse } from '@/types/app';
import { CartItem } from '@/types/models';
import { useAuth } from './auth-context';

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<CartState>(initialState);
  const { user, token } = useAuth();

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setState(prev => ({ ...prev, items: parsedCart }));
        }
      } catch (error) {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Sync with server when user logs in
  useEffect(() => {
    if (user && token) {
      syncWithServer();
    }
  }, [user, token]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = async (itemId: string, quantity: number) => {
    // Optimistically update UI
    setState(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.itemId === itemId);
      let newItems = [...prev.items];
      
      if (existingItemIndex !== -1) {
        newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity };
      } else {
        newItems.push({ itemId, quantity });
      }
      
      return { ...prev, items: newItems };
    });
    
    // Sync with server if authenticated
    if (user && token) {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ itemId, quantity }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update cart on server');
        }
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Failed to update cart on server' }));
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    // Just reuse addToCart since it handles both adding and updating
    await addToCart(itemId, quantity);
  };

  const removeFromCart = async (itemId: string) => {
    // Optimistically update UI
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.itemId !== itemId),
    }));
    
    // Sync with server if authenticated
    if (user && token) {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        const response = await fetch(`/api/cart/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to remove item from cart on server');
        }
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Failed to remove item from cart on server' }));
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, items: [] }));
    localStorage.removeItem('cart');
    
    // Clear on server if authenticated
    if (user && token) {
      fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cart: [] }),
      }).catch(error => {
        console.error('Failed to clear cart on server:', error);
      });
    }
  };

  const syncWithServer = async () => {
    if (!user || !token) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // First get server cart
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart from server');
      }
      
      const data: CartResponse = await response.json();
      
      if (!data.cart) {
        throw new Error('Invalid response from server');
      }
      
      // Merge local cart with server cart
      const serverCartMap = new Map<string, number>();
      data.cart.forEach(item => {
        serverCartMap.set(item.itemId, item.quantity);
      });
      
      const localCartItems = [...state.items];
      const mergedCart: CartItem[] = [];
      
      // Add all items from both carts, with local quantities taking precedence
      const allItemIds = new Set([
        ...localCartItems.map(item => item.itemId),
        ...serverCartMap.keys()
      ]);
      
      allItemIds.forEach(itemId => {
        const localItem = localCartItems.find(item => item.itemId === itemId);
        if (localItem) {
          mergedCart.push(localItem);
        } else {
          const serverQuantity = serverCartMap.get(itemId);
          if (serverQuantity) {
            mergedCart.push({ itemId, quantity: serverQuantity });
          }
        }
      });
      
      // Update state with merged cart
      setState(prev => ({ ...prev, items: mergedCart, isLoading: false }));
      
      // Push merged cart back to server
      await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cart: mergedCart }),
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to sync cart with server' 
      }));
    }
  };

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      syncWithServer 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
