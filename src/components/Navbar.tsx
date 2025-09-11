'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            E-Shop
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>

            <Link 
              href="/cart" 
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <span>Cart ({cartItemCount})</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-200">{user.email}</span>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login"
                  className="hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
