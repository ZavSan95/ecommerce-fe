'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { getProductImageUrl } from '@/utils/image';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({
  images,
  title,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Swiper modules={[Pagination]} pagination className="h-[60vh]">
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={getProductImageUrl(image)}
              alt={title}
              fill
              className="object-contain"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
