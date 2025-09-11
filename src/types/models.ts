export interface User {
  id: string;
  email: string;
  passwordHash: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}
