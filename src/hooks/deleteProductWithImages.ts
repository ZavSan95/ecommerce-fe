import { deleteProduct, deleteProductImage } from '@/services/products.service';
import toast from 'react-hot-toast';

export async function deleteProductWithImages(product: {
  id: string;
  variants: { images: string[] }[];
}) {
  try {
    /* =========================
       1️⃣ Recolectar imágenes
    ========================= */
    const images = product.variants.flatMap(v => v.images ?? []);

    /* =========================
       2️⃣ Eliminar imágenes
    ========================= */
    for (const img of images) {
      const filename = img.split('/').pop()!; 
      await deleteProductImage(filename);
    }

    /* =========================
       3️⃣ Eliminar producto
    ========================= */
    await deleteProduct(product.id);

  } catch (error) {
    console.error(error);
    toast.error('No se pudo eliminar el producto');
    throw error;
  }
}
