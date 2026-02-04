import { z } from 'zod';
import { RoleEnum } from './role.schema';

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  roles: z.array(RoleEnum),
  permissions: z.array(z.string()).default([]),
  isActive: z.boolean(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
