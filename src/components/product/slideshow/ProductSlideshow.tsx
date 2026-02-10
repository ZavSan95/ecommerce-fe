'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject } from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { getProductImageUrl } from '@/utils/image';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({
  images,
  title,
  className,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperObject | null>(null);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="h-[55vh] w-full rounded-lg"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={getProductImageUrl(image)}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        slidesPerView={5}
        spaceBetween={8}
        watchSlidesProgress
        className="h-[90px]"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <div className="relative w-full h-full rounded-md border">
              <Image
                src={getProductImageUrl(image)}
                alt={title}
                fill
                className="object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
