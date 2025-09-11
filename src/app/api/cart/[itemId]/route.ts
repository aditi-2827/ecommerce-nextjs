import { NextRequest, NextResponse } from 'next/server';
import { carts } from '@/lib/db';
import { verifyJwt } from '@/utils/jwt';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
): Promise<NextResponse> {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const payload = verifyJwt(token);
    
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = payload.userId;

    // Get current cart for user
    const userCart = carts[userId] || [];
    
    // Filter out the item with the specified itemId
    const updatedCart = userCart.filter(item => item.itemId !== params.itemId);
    
    // Update the cart in our "database"
    carts[userId] = updatedCart;

    return NextResponse.json({ 
      message: 'Item removed from cart', 
      cartItems: updatedCart 
    });
    
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
