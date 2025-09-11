import { User, Item, CartItem } from '@/types/models';

// Auth context types
export interface AuthState {
  user: { id: string; email: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Cart context types
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export interface CartContextType extends CartState {
  addToCart: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  syncWithServer: () => Promise<void>;
}

// API response types
export interface AuthResponse {
  token?: string;
  error?: string;
  message?: string;
}

export interface ItemsResponse {
  items?: Item[];
  item?: Item;
  error?: string;
}

export interface CartResponse {
  cart?: CartItem[];
  error?: string;
}
