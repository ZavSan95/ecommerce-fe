export interface FavoriteItem {
  id: string;
  productId: string;
  sku: string;
  name?: string;
  imageKey?: string; // 👈 CLAVE
  category?: string;
}
