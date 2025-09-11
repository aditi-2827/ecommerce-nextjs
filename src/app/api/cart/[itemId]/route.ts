import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { carts } from '@/lib/db';
import { verifyJwt } from '@/utils/jwt';

type RouteHandlerContext = {
  params: {
    itemId: string;
  };
};

export async function DELETE(
  request: NextRequest,
  context: RouteHandlerContext
): Promise<NextResponse> {
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
    const itemId = params.itemId;

    if (!carts[userId]) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not in cart' }, { status: 404 });
    }

    // Remove the item from the cart
    carts[userId].splice(itemIndex, 1);

    return NextResponse.json({ cart: carts[userId] });
  } catch (error) {
    console.error(`Error removing item from cart:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
