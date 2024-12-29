"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CircleChevronLeftIcon, CircleChevronRightIcon } from "lucide-react";

export default function HeroCarousel({ banners }) {
  return (
    <div className="swiper-container relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner, i) => {
          return (
            <SwiperSlide key={i} href={banner.imageUrl}>
              <Image
                width={712}
                height={384}
                src={banner.imageUrl}
                className="w-full"
                alt={banner.title}
                priority={true}
              />
            </SwiperSlide>
          );
        })}
        <div className="swiper-button-prev">
          <CircleChevronLeftIcon className="text-neutral-100" />
        </div>
        <div className="swiper-button-next">
          <CircleChevronRightIcon className="text-neutral-100" />
        </div>
      </Swiper>
    </div>
  );
}
