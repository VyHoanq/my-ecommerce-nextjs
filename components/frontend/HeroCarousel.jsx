"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroCarousel({ banners }) {
  return (
    <div className="swiper-container relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Changed this line
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[400px]"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} className="bg-transparent">
            <Image
              width={712}
              height={384}
              src={banner.imageUrl}
              className="w-full h-full object-cover"
              alt={banner.title}
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
