'use client'

import React, { useState } from 'react';
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Không cần sử dụng SwiperCore.use()
export default function ProductImageCarousel({ productImages = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
    "https://swiperjs.com/demos/images/nature-6.jpg",
    "https://swiperjs.com/demos/images/nature-7.jpg",
    "https://swiperjs.com/demos/images/nature-8.jpg",
    "https://swiperjs.com/demos/images/nature-9.jpg",
    "https://swiperjs.com/demos/images/nature-10.jpg"
], thumbnail }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="col-span-3">
            {
                productImages.length <= 0 ? (
                    <Image
                        src={thumbnail}
                        alt={""}
                        width={556}
                        height={556}
                        className="w-full"
                        priority={true}
                    />
                ) : (
                    <>
                        <Swiper
                            style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                            modules={[Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {productImages.map((image, i) => (
                                <SwiperSlide key={i}>
                                    <img src={image} alt={`Slide ${i + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper"
                        >
                            {productImages.map((image, i) => (
                                <SwiperSlide key={i}>
                                    <img src={image} alt={`Thumbnail ${i + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )
            }
        </div>
    );
}
