import { NextRequest, NextResponse } from 'next/server';
import { items } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@/types/models';
import { verifyJwt } from '@/utils/jwt';

// Get all items with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filteredItems = [...items];

    // Apply category filter
    if (categoryParam) {
      filteredItems = filteredItems.filter(
        item => item.category === categoryParam
      );
    }

    // Apply price range filters
    if (minPrice !== null) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filteredItems = filteredItems.filter(item => item.price >= min);
      }
    }

    if (maxPrice !== null) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filteredItems = filteredItems.filter(item => item.price <= max);
      }
    }

    return NextResponse.json({ items: filteredItems });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Create a new item (protected route - requires authentication)
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

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const itemData = await request.json();
    const newItem: Item = {
      id: uuidv4(),
      name: itemData.name,
      price: itemData.price,
      category: itemData.category,
      image: itemData.image || '',
      description: itemData.description || '',
    };

    items.push(newItem);
    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
