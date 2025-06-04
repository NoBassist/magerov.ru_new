"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

// Define the structure of a card
interface Card {
    image: string;
    firstLine: string; // First paragraph (category)
    secondLine: string; // Second paragraph (title)
    thirdLine: string; // Third paragraph (description)
    link: string; // Fourth paragraph (link)
}

interface CarouselProps {
    cards: Card[];
    autoplayDelay?: number;
    slideShadows?: boolean;
}

export const CardSwiper: React.FC<CarouselProps> = ({
                                                        cards,
                                                        autoplayDelay = 3000, // Increased delay
                                                        slideShadows = false,
                                                    }) => {

    const [ ,setIsInView] = useState(false);
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const swiperInstance = useRef<SwiperClass | null>(null); // Reference to the Swiper instance

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true); // Enable animations when in view
                        if (swiperInstance.current) {
                            swiperInstance.current.autoplay.start(); // Start autoplay
                        }
                    } else {
                        setIsInView(false); // Disable animations when out of view
                        if (swiperInstance.current) {
                            swiperInstance.current.autoplay.stop(); // Stop autoplay
                        }
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the component is visible
            }
        );

        if (swiperRef.current) {
            observer.observe(swiperRef.current);
        }

        return () => {
            if (swiperRef.current) {
                observer.unobserve(swiperRef.current);
            }
        };
    }, []);

    return (
        <section className="w-full py-4" ref={swiperRef}>
            {/* Slightly smaller container */}
            <div className="mx-auto w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[450px] rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
                <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
                    <div className="flex w-full items-center justify-center gap-4">
                        <div className="w-full">
                            {/* Enforce 350:500 aspect ratio for the Swiper container */}
                            <Swiper
                                className="w-full"
                                style={{
                                    aspectRatio: "350 / 500", // Maintain aspect ratio
                                }}
                                autoplay={{
                                            delay: autoplayDelay,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true, // Pause autoplay on hover
                                        }}
                                effect={"cards"}
                                grabCursor={true}
                                loop={true}
                                slidesPerView={"auto"}
                                rewind={true}
                                cardsEffect={{
                                    slideShadows: slideShadows,
                                }}
                                modules={[EffectCards, Autoplay, Pagination, Navigation]}
                                onSwiper={(swiper) => {
                                    swiperInstance.current = swiper; // Store the Swiper instance
                                }}
                            >
                                {cards.map((card, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="relative size-full rounded-3xl cursor-pointer overflow-hidden group"
                                            onClick={() => window.open(card.link, "_blank")}
                                        >
                                            {/* Darkened Background Overlay */}
                                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                                            {/* Image */}
                                            <Image
                                                src={card.image}
                                                alt={card.secondLine} // Use title as alt text
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover group-hover:blur-sm transition-all duration-300"
                                            />
                                            {/* Text Container */}
                                            <div
                                                className="absolute bottom-6 left-4 right-4 p-4 z-20 text-center
                          lg:group-hover:-translate-y-1/2 lg:group-hover:scale-105 transition-all duration-300"
                                            >
                                                {/* First Line (Category) */}
                                                <p className="text-xl sm:text-xl text-white font-medium font-inter leading-tight">
                                                    {card.firstLine}
                                                </p>
                                                {/* Second Line (Title) */}
                                                <h4 className="text-2xl sm:text-3xl font-unbounded font-bold text-white leading-tight mt-1">
                                                    {card.secondLine}
                                                </h4>
                                                {/* Third Line (Description) */}
                                                <p className="text-lg sm:text-xl text-white/75 font-medium font-inter leading-tight mt-1">
                                                    {card.thirdLine}
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};