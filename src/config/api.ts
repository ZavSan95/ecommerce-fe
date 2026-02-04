export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {

  login: `${API_URL}/auth/login`,
  me: `${API_URL}/auth/me`,
  logout: `${API_URL}/auth/logout`,
  users: `${API_URL}/auth/users`,
  createUser: `${API_URL}/auth/admin-register`,
  updateUser: (userId: string) => `${API_URL}/auth/user/${userId}`,
  getUser: (userId: string) => `${API_URL}/auth/user/${userId}`,
  toggleUserStatus: (userId: string) => `${API_URL}/auth/user/status/${userId}`,

  products: `${API_URL}/catalog/products`,
  productsByCategory: (slug: string) => `${API_URL}/catalog/products/category/${slug}`,
  productBySlug: (slug: string) => `${API_URL}/catalog/products/slug/${slug}`,
  productById: (id: string) => `${API_URL}/catalog/products/id/${id}`,
  uploadProducts: (id: string) =>  `${API_URL}/catalog/products/${id}`,
  deleteProducts: (id: string) => `${API_URL}/catalog/products/${id}`,

  categories: `${API_URL}/categories`,
  categoryById: (id: string) => `${API_URL}/categories/${id}`,
  update_category: (id: string)  => `${API_URL}/categories/${id}`,
  delete_category: (id: string) => `${API_URL}/categories/${id}`,
  toggle_status_category: (id: string) => `${API_URL}/categories/${id}/status`,

  my_orders: () => `${API_URL}/orders/my`,
  orderById: (id: string) => `${API_URL}/orders/order/${id}`,
  orders_checkout: () => `${API_URL}/orders/checkout`,
  orders: `${API_URL}/orders`,

  favorites: () => `${API_URL}/favorites`,
  favoriteById: (id: string) => `${API_URL}/favorites/${id}`,

  uploadImages: (url: string) => `${API_URL}/uploads/${url}`,
  deleteProductImages: (filename: string) => `${API_URL}/uploads/products/${filename}`,


};
