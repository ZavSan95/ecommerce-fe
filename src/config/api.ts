export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  products: `${API_URL}/catalog/products`,
  categories: `${API_URL}/categories`,
  productsByCategory: (slug: string) =>
    `${API_URL}/catalog/products/category/${slug}`,
  productBySlug: (slug: string) => 
    `${API_URL}/catalog/products/slug/${slug}`,
};
