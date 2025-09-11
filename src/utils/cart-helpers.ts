import { User, Item, CartItem } from '@/types/models';

export const fetchItemDetails = async (itemIds: string[]): Promise<Record<string, Item>> => {
  try {
    // Create an array of promises for each item fetch
    const itemPromises = itemIds.map(id => 
      fetch(`/api/items/${id}`)
        .then(res => res.json())
        .then(data => data.item)
        .catch(() => null)
    );
    
    // Wait for all promises to resolve
    const items = await Promise.all(itemPromises);
    
    // Build a map of id -> item
    const itemMap: Record<string, Item> = {};
    items.forEach(item => {
      if (item) {
        itemMap[item.id] = item;
      }
    });
    
    return itemMap;
  } catch (error) {
    console.error('Error fetching item details:', error);
    return {};
  }
};

export const calculateTotal = (cartItems: CartItem[], itemDetails: Record<string, Item>): number => {
  return cartItems.reduce((total, cartItem) => {
    const item = itemDetails[cartItem.itemId];
    if (item) {
      return total + (item.price * cartItem.quantity);
    }
    return total;
  }, 0);
};
