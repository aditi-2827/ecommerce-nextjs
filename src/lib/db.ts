import { User, Item, CartItem } from '../types/models';

export const users: User[] = [];
export const items: Item[] = [
  // Electronics products
  {
    id: '1',
    name: 'Premium Laptop',
    price: 1299.99,
    category: 'Electronics',
    image: '/images/products/Eproduct1.jpg',
    description: 'High-performance laptop with latest features.'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 149.99,
    category: 'Electronics',
    image: '/images/products/Eproduct2.jpg',
    description: 'Premium wireless headphones with noise cancellation.'
  },
  {
    id: '3',
    name: 'Smartphone Pro',
    price: 899.99,
    category: 'Electronics',
    image: '/images/products/Eproduct3.jpg',
    description: 'Latest smartphone with advanced camera system.'
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    price: 129.99,
    category: 'Electronics',
    image: '/images/products/Eproduct4.jpg',
    description: 'Comfortable wireless earbuds with great sound quality.'
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 249.99,
    category: 'Electronics',
    image: '/images/products/Eproduct5.jpg',
    description: 'Track your fitness and stay connected with this smart watch.'
  },
  
  // Clothing products
  {
    id: '6',
    name: 'Casual T-Shirt',
    price: 24.99,
    category: 'Clothing',
    image: '/images/products/Cproduct1.jpg',
    description: 'Comfortable cotton t-shirt, perfect for daily wear.'
  },
  {
    id: '7',
    name: 'Denim Jeans',
    price: 59.99,
    category: 'Clothing',
    image: '/images/products/Cproduct2.jpg',
    description: 'Classic denim jeans with perfect fit.'
  },
  {
    id: '8',
    name: 'Summer Dress',
    price: 45.99,
    category: 'Clothing',
    image: '/images/products/Cproduct3.jpg',
    description: 'Light and comfortable dress for summer days.'
  },
  {
    id: '9',
    name: 'Winter Jacket',
    price: 89.99,
    category: 'Clothing',
    image: '/images/products/Cproduct4.jpg',
    description: 'Warm winter jacket with water-resistant material.'
  },
  
  // Books products
  {
    id: '10',
    name: 'Fiction Bestseller',
    price: 19.99,
    category: 'Books',
    image: '/images/products/Bproduct1.jpg',
    description: 'Award-winning fiction novel that topped the charts.'
  },
  {
    id: '11',
    name: 'Cooking Guide',
    price: 29.99,
    category: 'Books',
    image: '/images/products/Bproduct2.jpg',
    description: 'Learn to cook like a professional chef with this guide.'
  },
  {
    id: '12',
    name: 'Business Strategy',
    price: 34.99,
    category: 'Books',
    image: '/images/products/Bproduct3.jpg',
    description: 'Essential business strategies for entrepreneurs.'
  },
  
  // Home products
  {
    id: '13',
    name: 'Coffee Maker',
    price: 79.99,
    category: 'Home',
    image: '/images/products/Hproduct1.jpg',
    description: 'Brew perfect coffee every morning with this coffee maker.'
  },
  {
    id: '14',
    name: 'Bedding Set',
    price: 99.99,
    category: 'Home',
    image: '/images/products/Hproduct2.jpg',
    description: 'Luxurious bedding set for a comfortable night sleep.'
  },
  {
    id: '15',
    name: 'Kitchen Knife Set',
    price: 129.99,
    category: 'Home',
    image: '/images/products/Hproduct3.jpg',
    description: 'Professional quality knife set for your kitchen needs.'
  },
  {
    id: '16',
    name: 'Smart Home Speaker',
    price: 199.99,
    category: 'Home',
    image: '/images/products/Hproduct4.jpg',
    description: 'Voice-controlled smart speaker for your home.'
  }
];
export const carts: Record<string, CartItem[]> = {};
