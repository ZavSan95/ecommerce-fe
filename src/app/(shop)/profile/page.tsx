'use client'

import { ProfileCard, Title } from '@/components';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

export default function ProfilePage() {


    const { isAuthenticated } = useAuthGuard('/profile', 600);
    const user = useAppSelector(state => state.auth.user);

    if (!isAuthenticated) {
        return null;
    }

  return (
    <div className="flex justify-center px-10 sm:px-0 mb-40">
      <div className="w-full xl:w-[1000px] flex flex-col">

        {/* Título */}
        <Title
          title="Tienda"
          subtitle="Perfil"
          className="mb-6"
        />

        <ProfileCard user={user}/>

      </div>
    </div>
  );
}
