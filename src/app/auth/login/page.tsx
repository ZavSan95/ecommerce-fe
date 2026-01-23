'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { loginRequest, authMe } from '@/services/auth.service';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/auth/authSlice';

export default function LoginPage() {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get('redirect') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // 🔐 Chequeo de sesión al entrar
  useEffect(() => {
    authMe()
      .then(({ user }) => {
        // Ya hay sesión → rehidratamos y redirigimos
        dispatch(setUser(user));
        router.replace(redirectTo);
      })
      .catch(() => {
        // No hay sesión → puede ver el login
        setCheckingSession(false);
      });
  }, [dispatch, router, redirectTo]);

  // ⏳ Mientras chequeamos sesión, no renderizamos nada
  if (checkingSession) {
    return null; // o spinner si querés
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginRequest(email, password);
      dispatch(setUser(data.user));
      router.replace(redirectTo);
    } catch {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>
        Ingresar
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col max-w-md">

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        {/* divisor */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/register"
          className="btn-secondary text-center"
        >
          Crear una nueva cuenta
        </Link>

      </form>
    </div>
  );
}
