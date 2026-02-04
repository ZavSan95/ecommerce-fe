'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { userSchema } from '@/schemas/user.schema';


import { createUser, updateUser } from '@/services/auth.service';
import { updateUserPayloadSchema } from '@/schemas/update-user.schema';

interface Props {
  userId?: string;
  defaultValues?: {
    name?: string;
    email?: string;
    role?: 'admin' | 'customer';
  };
  isEdit?: boolean;
}

export function UserForm({
  userId,
  defaultValues,
  isEdit = false,
}: Props) {
  const router = useRouter();

  /**
   * 🔑 SCHEMA DINÁMICO
   * - CREATE → userSchema (con password + confirmPassword)
   * - UPDATE → updateUserPayloadSchema (sin passwords)
   */
  const schema = isEdit
    ? updateUserPayloadSchema
    : userSchema;

  /**
   * ⚠️ IMPORTANTE
   * React Hook Form NO soporta bien schemas dinámicos tipados,
   * por eso usamos <any>. El tipado fuerte vive en Zod y en el backend.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      role: 'customer',
      ...defaultValues,
    },
  });

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: any) => {
    try {
      if (isEdit && userId) {
        // 👉 UPDATE: no se envían passwords
        await updateUser(userId, data);
        toast.success('Usuario actualizado correctamente');
      } else {
        // 👉 CREATE: quitamos confirmPassword
        const { confirmPassword, ...payload } = data;
        await createUser(payload);
        toast.success('Usuario creado correctamente');
      }

      router.replace('/admin/users');
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.message ?? 'Ocurrió un error al guardar el usuario'
      );
    }
  };

  /* ================= RENDER ================= */

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          {...register('name')}
          className="w-full rounded border px-3 py-2"
        />
        {errors?.name && (
          <p className="text-xs text-red-600">
            {String(errors.name.message)}
          </p>
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
        {errors?.email && (
          <p className="text-xs text-red-600">
            {String(errors.email.message)}
          </p>
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
        {errors?.role && (
          <p className="text-xs text-red-600">
            {String(errors.role.message)}
          </p>
        )}
      </div>

      {/* Passwords SOLO en CREATE */}
      {!isEdit && (
        <>
          <div>
            <label className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded border px-3 py-2"
            />
            {errors?.password && (
              <p className="text-xs text-red-600">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirmar contraseña
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full rounded border px-3 py-2"
            />
            {errors?.confirmPassword && (
              <p className="text-xs text-red-600">
                {String(errors.confirmPassword.message)}
              </p>
            )}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            !isValid ||
            (isEdit && !isDirty)
          }
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {isEdit ? 'Actualizar usuario' : 'Crear usuario'}
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
