'use client'

import { titleFont } from '@/config/fonts';
import { authMe, registerRequest } from '@/services/auth.service';
import { setUser } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { hasAuthCookie } from '@/utils/authCookies';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function () {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get('redirect') ?? '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Chequeo de sesión al entrar
  useEffect(() => {
    if (!hasAuthCookie()) {
      setCheckingSession(false);
      return;
    }

    authMe()
      .then(({ user }) => {
        dispatch(setUser(user));
        router.replace(redirectTo);
      })
      .catch(() => {
        setCheckingSession(false);
      });
  }, [dispatch, router, redirectTo]);


  // ⏳ Mientras chequeamos sesión, no renderizamos nada
  if (checkingSession) {
    return null; // o spinner si querés
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerRequest({name, email, password});
      dispatch(setUser(data.user));
      router.replace(redirectTo);
      toast.success('Cuenta creada con éxito');
    } catch (error) {
      setError('Datos incorrectos');
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Nueva cuenta</h1>

      <div className="flex flex-col">

        <label htmlFor="name">Nombre completo</label>
        <input
          id='name'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />


        <label htmlFor="email">Correo electrónico</label>
        <input
          id='email'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />


        <label htmlFor="password">Contraseña</label>
        <input
          id='password'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" 
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleRegister}
          className="btn-primary">
          Crear cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </div>
    </div>
  );
}