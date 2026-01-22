import { CartItem } from '@/interfaces/cart-item.interface';

export const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
