import { z } from 'zod';

export const RoleEnum = z.enum([
  'admin',
  'customer',
]);