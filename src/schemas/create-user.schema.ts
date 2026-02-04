import { z } from 'zod';
import { RoleEnum } from './role.schema';

export const createUserPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: RoleEnum,
  password: z.string().min(8),
});

export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
