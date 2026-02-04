'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import {
  updateUserPayloadSchema,
  UpdateUserPayload,
} from '@/schemas/update-user.schema';

import { updateUser } from '@/services/auth.service';

interface Props {
  userId: string;
  defaultValues: UpdateUserPayload;
}

export function EditUserForm({ userId, defaultValues }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserPayloadSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = async (data: UpdateUserPayload) => {
    try {
      await updateUser(userId, data);

      toast.success('Usuario actualizado correctamente');
      router.replace('/admin/users');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message ?? 'Ocurrió un error al guardar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          {...register('name')}
          className="w-full rounded border px-3 py-2"
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full rounded border px-3 py-2"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Rol */}
      <div>
        <label className="block text-sm font-medium">Rol</label>
        <select
          {...register('role')}
          className="w-full rounded border px-3 py-2"
        >
          <option value="customer">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
        {errors.role && (
          <p className="text-xs text-red-600">{errors.role.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !isValid || !isDirty}
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          Actualizar usuario
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/users')}
          className="rounded border px-4 py-2"
        >
          Cancelar
        </button>
      </div>

    </form>
  );
}
