import { z } from 'zod';
import { RoleEnum } from './role.schema';

export const updateUserPayloadSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  role: RoleEnum.optional(),
});

export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>;
