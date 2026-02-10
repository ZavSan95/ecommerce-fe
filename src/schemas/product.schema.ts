import { z } from 'zod';

/* ========================= */
/* Variant Schema            */
/* ========================= */
export const variantSchema = z.object({
  sku: z.string().min(1, 'SKU requerido'),

  price: z.number().positive('Precio inválido'),

  stock: z.number().int().min(0, 'Stock inválido'),

  attributes: z.record(z.string(), z.string()).optional(),

  // 🔵 Backend (persistente)
  images: z.array(z.string()).optional(),

  // 🔵 Frontend only (subida)
  imageFiles: z
    .array(
      z.object({
        file: z.any(),
        preview: z.string(),
      }),
    )
    .optional(),


  // 🔴 Frontend only (borrado diferido)
  imagesToRemove: z.array(z.string()).optional(),

  isDefault: z.boolean(),

  isNew: z.boolean().optional(),
});


/* ========================= */
/* Product Schema            */
/* ========================= */
export const productSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),

  description: z.string().optional(),

  categoryId: z.string().min(1, 'Categoría requerida'),

  variants: z
    .array(variantSchema)
    .min(1, 'Debe existir al menos una variante')
    .refine(
      vars => vars.some(v => v.isDefault),
      { message: 'Debe existir una variante por defecto' }
    ),
});

/* ========================= */
/* Types                     */
/* ========================= */
export type ProductFormData = z.infer<typeof productSchema>;
