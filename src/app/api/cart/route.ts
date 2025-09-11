import { NextRequest, NextResponse } from 'next/server';
import { carts } from '@/lib/db';
import { verifyJwt } from '@/utils/jwt';
import { CartItem } from '@/types/models';

// Get user cart
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token) as { userId: string } | null;
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = payload.userId;
    const userCart = carts[userId] || [];

    return NextResponse.json({ cart: userCart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Add/update cart item
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token) as { userId: string } | null;
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = payload.userId;
    const { itemId, quantity } = await request.json();

    if (!itemId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid item ID or quantity' },
        { status: 400 }
      );
    }

    // Initialize cart if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }

    // Check if item already exists in cart
    const existingItemIndex = carts[userId].findIndex(
      item => item.itemId === itemId
    );

    if (existingItemIndex !== -1) {
      // Update quantity
      carts[userId][existingItemIndex].quantity = quantity;
    } else {
      // Add new item to cart
      carts[userId].push({ itemId, quantity });
    }

    return NextResponse.json({ cart: carts[userId] });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Replace entire cart (for sync with localStorage)
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token) as { userId: string } | null;
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = payload.userId;
    const { cart } = await request.json();

    if (!Array.isArray(cart)) {
      return NextResponse.json(
        { error: 'Invalid cart data' },
        { status: 400 }
      );
    }

    // Validate cart items
    const validCart = cart.filter(
      (item): item is CartItem => 
        typeof item === 'object' && 
        typeof item.itemId === 'string' && 
        typeof item.quantity === 'number' && 
        item.quantity > 0
    );

    carts[userId] = validCart;

    return NextResponse.json({ cart: carts[userId] });
  } catch (error) {
    console.error('Error replacing cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
