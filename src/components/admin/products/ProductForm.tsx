'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useForm,
  useFieldArray,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { productSchema, ProductFormData } from '@/schemas/product.schema';
import { createProduct, deleteProductImage, updateProduct } from '@/services/products.service';
import { fetchCategories } from '@/services/categories.service';
import { Category } from '@/interfaces/categories.interface';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductVariants } from './ProductVariants';
import uploadImages from '@/services/upload.service';
import { generateSku } from '@/utils/slugify';


interface Props {
  productId?: string;
  defaultValues?: ProductFormData;
  isEdit?: boolean;
}

export function ProductForm({
  productId,
  defaultValues,
  isEdit = false,
}: Props) {
  const router = useRouter();

  /* ===================== */
  /* React Hook Form       */
  /* ===================== */
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      categoryId: '',
      variants: [
        {
          sku: '',
          price: 0,
          stock: 0,
          images: [],
          imageFiles: [],
          isDefault: true,
        },
      ],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const [currentProduct, setCurrentProduct] = useState<ProductFormData | null>(
    defaultValues ?? null
  );

  /* ===================== */
  /* Categorías            */
  /* ===================== */
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories({ page: 1, limit: 100 })
      .then(res => setCategories(res.data))
      .catch((err) => {
        if (err.message === 'UNAUTHORIZED') {
          toast.error('Sesión expirada');
          return;
        }

        toast.error('Error al cargar categorías');
      });
  }, []);


  useEffect(() => {
    if (defaultValues?.categoryId && categories.length > 0) {
      setValue('categoryId', defaultValues.categoryId);
    }
  }, [categories, defaultValues?.categoryId, setValue]);

  useEffect(() => {
    console.log('isSubmitting:', isSubmitting);
  }, [isSubmitting]);

  
  /* ===================== */
  /* SKU            */
  /* ===================== */
  const name = methods.watch('name');
  const variants = methods.watch('variants');

  useEffect(() => {
    if (!name) return;

    variants.forEach((variant, index) => {
      
      if (isEdit && !variant.isNew) return;

      
      if (variant.isNew || !variant.sku) {
        const sku = generateSku(name, index);
        setValue(`variants.${index}.sku`, sku, {
          shouldDirty: true,
        });
      }
    });
  }, [name, variants.length, isEdit]);

  


  /* ===================== */
  /* Submit                */
  /* ===================== */
  const onSubmit = async (data: ProductFormData) => {
    try {
      /* ========================= */
      /* Procesar imágenes         */
      /* ========================= */
      const processedVariants = [];

      for (const variant of data.variants) {
        const hasExistingImages =
          Array.isArray(variant.images) && variant.images.length > 0;

        const hasNewImages =
          Array.isArray(variant.imageFiles) &&
          variant.imageFiles.length > 0;

        // ❌ Validación: al menos una imagen
        if (!hasExistingImages && !hasNewImages) {
          throw new Error(
            `La variante "${variant.sku}" debe tener al menos una imagen`
          );
        }

        /* 🔴 Borrar imágenes marcadas */
        if (variant.imagesToRemove?.length) {
          for (const img of variant.imagesToRemove) {
            const filename = img.split('/').pop();
            if (filename) {
              await deleteProductImage(filename);
            }
          }
        }

        /* 🔵 Subir nuevas imágenes */
        let images = variant.images ?? [];

        if (hasNewImages) {
          const uploaded = await uploadImages(
            'products',
            variant.imageFiles!
          );

          images = [
            ...images,
            ...uploaded.map(u => u.key),
          ];
        }

        /* Guardar variante procesada (sin campos frontend-only) */
        processedVariants.push({
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          images,
          attributes: variant.attributes,
          isDefault: variant.isDefault,
          isNew: variant.isNew, // 👈 solo para separar luego
        });
      }

      /* ========================= */
      /* Guardar producto          */
      /* ========================= */
      if (isEdit && productId) {
        const variantsToUpdate = processedVariants
          .filter(v => !v.isNew)
          .map(({ isNew, ...v }) => v);

        const variantsToAdd = processedVariants
          .filter(v => v.isNew)
          .map(({ isNew, ...v }) => v);

        await updateProduct(productId, {
          name: data.name,
          description: data.description,
          category: data.categoryId,

          ...(variantsToUpdate.length && { variantsToUpdate }),
          ...(variantsToAdd.length && { variantsToAdd }),
        });

        toast.success('Producto actualizado correctamente');
      } else {
        await createProduct({
          name: data.name,
          description: data.description,
          categoryId: data.categoryId,
          status: 'active',
          variants: processedVariants.map(({ isNew, ...v }) => v),
        });

        toast.success('Producto creado correctamente');
      }

      router.replace('/admin/products');
      router.refresh();

    } catch (error: any) {
      console.error(error);
      toast.error(error.message ?? 'Error al guardar producto');
    }
  };




  /* ===================== */
  /* Render                */
  /* ===================== */
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <ProductBasicInfo
          register={register}
          errors={errors}
          categories={categories}
          isSubmitting={isSubmitting}
        />

        <ProductVariants
          control={control}
          fields={fields}
          append={append}
          remove={remove}     
          isSubmitting={isSubmitting}
        />

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
          >
            {isSubmitting
              ? 'Guardando...'
              : isEdit
                ? 'Actualizar producto'
                : 'Crear producto'}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.push('/admin/products')}
            className="px-4 py-2 rounded-xl border border-slate-300"
          >
            Cancelar
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
