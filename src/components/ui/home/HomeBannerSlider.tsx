'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    title: 'Nueva colección',
    subtitle: 'Descubrí los últimos productos',
    image: '/imgs/banners/image1.png',
    href: '/category/novedades',
  },
  {
    id: 2,
    title: 'Ofertas especiales',
    subtitle: 'Promociones por tiempo limitado',
    image: '/imgs/banners/image2.png',
    href: '/offers',
  },
  {
    id: 3,
    title: 'Tecnología',
    subtitle: 'Lo mejor en electrónica',
    image: '/imgs/banners/image3.png',
    href: '/category/electronica',
  },
];

export const HomeBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden rounded-lg mb-10">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0'
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-12 max-w-xl text-white">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-sm sm:text-lg mb-4">
                {banner.subtitle}
              </p>

              <Link
                href={banner.href}
                className="inline-block bg-white text-black px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
              >
                Ver más
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
