"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperConfig, setSwiperConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);

      setSwiperConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls.length]);

  const activeStyles =
    "active:scale[0.97] grid opacity-100 hover:scale[105] absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inActiveStyles = "hidden text-gray-400";

  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition", {
            [inActiveStyles]: swiperConfig.isEnd,
            "hover:bg-primary-300 text-gray-800 opacity-100":
              !swiperConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRightCircle className="w-4 h-4 text-zinc-700" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition", {
            [inActiveStyles]: swiperConfig.isBeginning,
            "hover:bg-primary-300 text-gray-800 opacity-100":
              !swiperConfig.isBeginning,
          })}
          aria-label="prev image"
        >
          <ChevronLeftCircle className="w-4 h-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        className="h-full w-full"
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={50}
        pagination={{
          renderBullet: (_, className) =>{
            return `<span class="rounded-full transition ${className}"></span>`
          }
        }}
      >
        {urls.map((url, idx) => (
          <SwiperSlide key={idx} className="-z-10 w-full h-full relative">
            <Image
              src={url}
              alt="image slider"
              fill
              className="-z-10 w-full h-full object-center object-cover"
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
