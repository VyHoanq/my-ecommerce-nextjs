"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MarketCarousel({ markets }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      //   deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {markets.map((markets, i) => {
        return (
          <Link
            key={i}
            href={`/market/${markets.slug}`}
            className="rounded-lg mr-3 flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <Image
                width={160}
                height={160}
                className="w-full h-full object-cover"
                src={markets.logoUrl}
                alt={markets.title}
                priority={true}
                quality={90} // Tăng chất lượng hình ảnh
              />
            </div>
            <h2 className="dark:text-black font-bold text-slate-800 mt-2 text-center">
              {markets.title}
            </h2>
          </Link>
        );
      })}
    </Carousel>
  );
}
