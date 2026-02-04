import { z } from 'zod';
import { RoleEnum } from './role.schema';

export const userSchema = z
  .object({
    email: z
      .string()
      .email('Email inválido')
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),

    confirmPassword: z.string(),

    name: z
      .string()
      .min(2, 'El nombre es muy corto')
      .max(50, 'El nombre es demasiado largo')
      .trim(),

    role: RoleEnum,
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    }
  );


export type UserFormData = z.infer<typeof userSchema>;