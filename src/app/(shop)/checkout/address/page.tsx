'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Title } from '@/components';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';

import { addressSchema, AddressFormData } from '@/schemas/address.schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { setAddress } from '@/store/checkout/checkoutSlice';

export default function AddressPage() {

  const { isAuthenticated, isChecking } = useAuthGuard('/checkout/address', 600);
  const address = useAppSelector(state => state.checkout.address);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues: address ?? undefined,
  });

  if (isChecking) {
    return <Spinner label="Verificando sesión..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = (data: AddressFormData) => {
    console.log('Dirección válida:', data);
    dispatch(setAddress(data));
    router.push('/checkout/payment')
  };

  const inputClass = (error?: boolean) =>
    `p-2 border rounded-md ${
      error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-200'
    }`;

  return (
    <div className="flex flex-col sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full xl:w-[1000px] flex flex-col">

        <Title title="Dirección" subtitle="Dirección de entrega" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
        >

          {/* Nombres */}
          <div className="flex flex-col mb-2">
            <span>Nombres</span>
            <input
              {...register('firstName')}
              autoComplete="given-name"
              className={inputClass(!!errors.firstName)}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Apellidos */}
          <div className="flex flex-col mb-2">
            <span>Apellidos</span>
            <input
              {...register('lastName')}
              autoComplete="family-name"
              className={inputClass(!!errors.lastName)}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Dirección */}
          <div className="flex flex-col mb-2">
            <span>Dirección</span>
            <input
              {...register('address')}
              autoComplete="address-line1"
              className={inputClass(!!errors.address)}
            />
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Dirección 2 */}
          <div className="flex flex-col mb-2">
            <span>Dirección 2 (opcional)</span>
            <input
              {...register('address2')}
              autoComplete="address-line2"
              className={inputClass()}
            />
          </div>

          {/* Código postal */}
          <div className="flex flex-col mb-2">
            <span>Código postal</span>
            <input
              {...register('postalCode')}
              autoComplete="postal-code"
              className={inputClass(!!errors.postalCode)}
            />
            {errors.postalCode && (
              <span className="text-sm text-red-500">
                {errors.postalCode.message}
              </span>
            )}
          </div>

          {/* Ciudad */}
          <div className="flex flex-col mb-2">
            <span>Ciudad</span>
            <input
              {...register('city')}
              autoComplete="address-level2"
              className={inputClass(!!errors.city)}
            />
            {errors.city && (
              <span className="text-sm text-red-500">
                {errors.city.message}
              </span>
            )}
          </div>

          {/* Provincia / Estado */}
          <div className="flex flex-col mb-2">
            <span>Provincia</span>
            <input
              {...register('state')}
              autoComplete="address-level1"
              className={inputClass(!!errors.state)}
            />
            {errors.state && (
              <span className="text-sm text-red-500">
                {errors.state.message}
              </span>
            )}
          </div>

          {/* País */}
          <div className="flex flex-col mb-2">
            <span>País</span>
            <select
              {...register('country')}
              className={inputClass(!!errors.country)}
            >
              <option value="">[ Seleccione ]</option>
              <option value="AR">Argentina</option>
              <option value="UY">Uruguay</option>
            </select>
            {errors.country && (
              <span className="text-sm text-red-500">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col mb-2">
            <span>Teléfono</span>
            <input
              {...register('phone')}
              autoComplete="tel"
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && (
              <span className="text-sm text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-6 col-span-1 sm:col-span-2">
            <Link
              href="/checkout"
              className="btn-secondary flex justify-center w-1/2"
            >
              Volver
            </Link>

            <button
              type="submit"
              disabled={!isValid}
              className={`btn-primary w-1/2 ${
                !isValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Siguiente
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
