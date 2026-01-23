import { z } from 'zod';

export const addressSchema = z.object({
  firstName: z.string().min(2, 'Nombre obligatorio'),
  lastName: z.string().min(2, 'Apellido obligatorio'),
  address: z.string().min(5, 'Dirección inválida'),
  address2: z.string().optional(),
  postalCode: z.string().min(4, 'Código postal inválido'),
  city: z.string().min(2, 'Ciudad obligatoria'),
  country: z.string().min(1, 'Seleccioná un país'),
  phone: z.string().min(8, 'Teléfono inválido'),
});

export type AddressFormData = z.infer<typeof addressSchema>;
