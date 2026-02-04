import { z } from 'zod';

export const PermissionEnum = z.enum([
  'products.create',
  'products.update',
  'products.delete',
  'orders.read',
  'orders.update',
  'users.manage',
]);